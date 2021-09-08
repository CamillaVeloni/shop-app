import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';
import Spinner from '../components/commons/Spinner';

const StartupScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // Tentando auto login com async storage (i.e. savingUserStorage em actions/auth)
  useEffect(() => {
    const autoLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        // Se não tiver token guardado então navega para tela de login
        navigation.navigate('Auth');
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiresIn } = transformedData;
      const expirationDate = new Date(expiresIn);

      // Se a data que o token virar invalido for menor ou igual a data atual ou seja o token tá inválido
      // OU se não for achado o token OU se não for achado um userId
      if (expirationDate <= new Date() || !token || !userId) {
        navigation.navigate('Auth');
        return;
      }

      // Calculando tempo que falta para token ficar inválido
      const expirationTime = expirationDate.getTime() - new Date().getTime();

      // Se passou pelos checks então pode auto logar
      dispatch(authActions.authenticate(userId, token, expirationTime));
      navigation.navigate('Shop');
    };

    autoLogin();
  }, [dispatch]);

  return <Spinner />;
};

export default StartupScreen;
