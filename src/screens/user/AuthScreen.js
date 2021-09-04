import React, { useEffect, useCallback, useReducer, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import * as authActions from '../../store/actions/auth';
import DefaultBtn from '../../components/commons/DefaultBtn';
import Input from '../../components/commons/Input';
import Card from '../../components/commons/Card';
import Spinner from '../../components/commons/Spinner';
import Colors from '../../constants/Colors';

const AUTH_INPUT_UPDATE = 'updateFormAuth';

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }

      return {
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: updatedFormIsValid,
      };
    default:
      return state;
  }
};
const AuthScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // State para spinner (esperando resposta)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // Switch para login e cadastro
  const [isSignup, setIsSignup] = useState(false); // inicialmente está em modo login

  // Formulário de Autenticação
  const [formAuth, formInputDispatch] = useReducer(authReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  // Handler para input email e password (i.e. Input - onInputChange prop)
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      formInputDispatch({
        type: AUTH_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [formInputDispatch]
  );

  // Handler para botão de login ou cadastro
  const authHandler = async () => {
    if (!formAuth.formIsValid) {
      // verificando se formulário não é valido
      Alert.alert(
        'Erro na validação',
        'Por favor, verifique os erros no formulário.',
        [{ text: 'Ok' }]
      );
      return;
    }
    setError(null);
    setIsLoading(true);

    let action; // verificando se a ação é login ou cadastro e adicionando a action correta (i.e. signUp ou signIn)
    if (isSignup) {
      // modo cadastro
      action = authActions.signUp(
        formAuth.inputValues.email,
        formAuth.inputValues.password
      );
    } else {
      action = authActions.signIn(
        formAuth.inputValues.email,
        formAuth.inputValues.password
      );
    }

    try {
      await dispatch(action);
      navigation.navigate('Shop')
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  // Mostrando erro com useEffect
  useEffect(() => {
    if (error) {
      Alert.alert('Um erro aconteceu!', error, [{ text: 'Okay' }]);

      setError(null);
    }
  }, [error]);

  return (
    <View style={styles.screen}>
      <LinearGradient style={styles.gradient} colors={['#FCB5AC', '#B99095']}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="Digite seu e-mail:"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              autoCorrect={false}
              errorText="Digite um e-mail válido."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Digite sua senha:"
              keyboardType="default"
              required
              minLength={6}
              autoCapitalize="none"
              secureTextEntry
              autoCorrect={false}
              errorText="Digite uma senha válida. Precisa de pelo menos 6 caracteres."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </ScrollView>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primaryColor} />
          ) : (
            <DefaultBtn
              label={isSignup ? 'Cadastrar' : 'Login'}
              ownStyle={{ fontSize: 15 }}
              onPress={authHandler}
            />
          )}
          <DefaultBtn
            label={`Trocar para ${isSignup ? 'Login' : 'Cadastro'}`}
            ownStyle={{ fontSize: 15 }}
            onPress={() => {
              setIsSignup((prevState) => !prevState);
            }}
          />
        </Card>
      </LinearGradient>
    </View>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Autentificação',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: '90%',
    maxWidth: 400,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthScreen;
