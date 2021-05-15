import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { LogBox } from 'react-native';

//import { composeWithDevTools } from 'redux-devtools-extension'
import ShopNavigator from './navigation/ShopNavigator';
import RootReducer from './store/';

const store = createStore(RootReducer);
LogBox.ignoreAllLogs();

export default function App() {
  let [fontLoaded] = useFonts({
    'mont-regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mont-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'mont-italic': require('../assets/fonts/Montserrat-Italic.ttf'),
  });

  if(!fontLoaded) return <AppLoading />
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
