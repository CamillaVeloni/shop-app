import React from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import DefaultHeaderBtn from '../../components/commons/DefaultHeaderBtn';
import ProductsList from '../../components/shop/ProductsList';

// Tela de Produtos ~~ Tem lógica para pegar os produtos do redux + de carregar a lista de produtos (até agora)
// Todos os produtos
const ProductsOverviewScreen = ({ navigation }) => {
  const allproducts = useSelector(({ products }) => products.availableProducts);

  return <ProductsList productsList={allproducts} navigation={navigation} />;
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Todos Produtos',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={DefaultHeaderBtn}>
        <Item
          title="Drawer"
          iconSize={23}
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={DefaultHeaderBtn}>
        <Item
          title="Cart"
          iconSize={23}
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => navigation.navigate('Cart')}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;
