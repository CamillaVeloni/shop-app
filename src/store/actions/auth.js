import AsyncStorage from '@react-native-async-storage/async-storage';

import { firebaseConfig } from '../../config';

export const STORING_USER = 'storingUser';
export const LOGOUT = 'logout';

let timer;

export const authenticate = (userId, token, expirationTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expirationTime));
    dispatch({
      type: STORING_USER,
      userId,
      token,
    });
  };
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    console.log(email, password);
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    // Verificando resposta - customizando erro
    if (!response.ok) {
      const realErrorResp = await response.json();
      const errorId = realErrorResp.error.message;

      let message =
        'Algo deu errado na requisição! Tente outra vez mais tarde.'; // default text
      if (errorId === 'EMAIL_EXISTS') {
        message = 'Esse endereço de e-mail já está cadastrado no aplicativo.';
      }

      throw new Error(message);
    }

    const realResponse = await response.json();

    dispatch(
      authenticate(
        realResponse.localId,
        realResponse.idToken,
        parseInt(realResponse.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(realResponse.expiresIn) * 1000
    );
    savingUserStorage(
      realResponse.idToken,
      realResponse.localId,
      expirationDate
    );
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    // Verificando resposta - customizando erro
    if (!response.ok) {
      const realErrorResp = await response.json();
      const errorId = realErrorResp.error.message;

      let message =
        'Algo deu errado na requisição! Tente outra vez mais tarde.'; // default text
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'Não há registro de usuário correspondente a este e-mail.';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'A senha é inválida ou o usuário não possui uma senha.';
      }

      throw new Error(message);
    }

    const realResponse = await response.json();
    // realResponse.expiresIn vem como segundos mas setLogoutTimer e authenticate só aceita milisegundos
    dispatch(
      authenticate(
        realResponse.localId,
        realResponse.idToken,
        parseInt(realResponse.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(realResponse.expiresIn) * 1000
    );
    savingUserStorage(
      realResponse.idToken,
      realResponse.localId,
      expirationDate
    );
  };
};

// Saindo do app: primeiro 'limpando' o timer, esvaziando userData do async storage e dps iniciando state auth
export const logOut = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    // se timer existir então 'limpa'/'esvazia' ele
    clearTimeout(timer);
  }
};

// Timer para deslogar com expiration date
const setLogoutTimer = (expirationTime) => {
  // expirationTime tem que está em miliseconds!!
  // É guardado o resultado do timeout na variavel 'timer' para qnd acontecer o logOut, ele ser removido
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logOut());
    }, expirationTime);
  };
};

// Usando AsyncStorage para guardar token e userId ~~ https://reactnative.dev/docs/security
// Obs: seguindo curso MAS o doc mostra que não se deve usar ele com Token storage e Secrets
const savingUserStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiresIn: expirationDate.toISOString(),
    })
  );
};
