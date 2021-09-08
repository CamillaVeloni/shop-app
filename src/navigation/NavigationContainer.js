import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import ShopNavigator from './ShopNavigator';

// Wrapping ShopNavigator para ter acesso ao redux que foi provido pelo Provider (i.e. /App)
// O intuito do NavigationContainer é para navegar para o login quando o timer terminar
const NavigationContainer = () => {
    const navRef = useRef(); // pegando referencia do navegador para ter acesso ao navigation
    const isAuth = useSelector(state => !!state.auth.token); // true ou false dependendo do token

    // Usando para navegar para login se não existir token
    useEffect(() => {
        if(!isAuth) {
            navRef.current.dispatch(NavigationActions.navigate({ routeName: 'Auth' }))
        }
    }, [isAuth]);

    return <ShopNavigator ref={navRef} />
}

export default NavigationContainer;