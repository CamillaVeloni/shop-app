import { firebaseConfig } from '../../config';
export const STORING_USER = 'storingUser';

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

    dispatch({
      type: STORING_USER,
      token: realResponse.idToken,
      userId: realResponse.localId,
    });
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

    dispatch({
      type: STORING_USER,
      token: realResponse.idToken,
      userId: realResponse.localId,
    });
  };
};
