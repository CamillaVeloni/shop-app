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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={DefaultHeaderBtn}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          iconSize={25}
          onPress={() => navigation.navigate('Cart')}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;
