import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';

const defaultNavigationStyle = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTitleStyle: {
        fontFamily: 'mont-bold',
        fontSize: 18
    },
    headerBackTitleStyle: {
        fontFamily: 'mont-regular',
        fontSize: 14
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
        },
        headerTitleStyle: {
            fontFamily: 'mont-bold',
            fontSize: 18
        },
        headerBackTitleStyle: {
            fontFamily: 'mont-regular',
            fontSize: 14
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    }
});

export default createAppContainer(ProductsNavigator);