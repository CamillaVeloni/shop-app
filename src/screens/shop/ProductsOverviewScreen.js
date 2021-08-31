import React, { useState, useEffect, useCallback } from 'react';
import {
  Platform,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as productsActions from '../../store/actions/products';
import DefaultHeaderBtn from '../../components/commons/DefaultHeaderBtn';
import ProductsList from '../../components/shop/ProductsList';
import DefaultBtn from '../../components/commons/DefaultBtn';
import Spinner from '../../components/commons/Spinner';

// Tela de Produtos ~~ Tem lógica para pegar os produtos do redux + de carregar a lista de produtos (até agora)
// Todos os produtos
const ProductsOverviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // state para spinner (enquanto espera produtos da database) e para mensagem de erro
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // pegando os produtos do redux
  const allproducts = useSelector(({ products }) => products.availableProducts);

  // Função de fetch os produtos
  const loadProducts = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [setError, setLoading, dispatch]);

  // Criando um listener para eventos de navegação ~~ atualizar produtos (loadProducts)
  // https://reactnavigation.org/docs/function-after-focusing-screen/ ~~ react navigation 5+
  // https://reactnavigation.org/docs/navigation-events/ ~~ addListener
  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', loadProducts);

    // clean up function ~~ acontece que irá 'rodar' toda vez que o useEffect for 'rodar' denovo
    // ou qnd esse componente for ser destruido ~~ obs: precisa ser uma função
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  // UseEffect para usar função loadProducts
  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  // Mostrar erro
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.defaultText}>
          Um erro aconteceu! Tente outra vez mais tarde.
        </Text>
        <DefaultBtn label="Tentar denovo" onPress={loadProducts} />
      </View>
    );
  }
  // Mostrando spinner enquanto estiver esperando resposta do firebae
  if (loading) return <Spinner />;

  // Mostrar mensagem se não tiver nenhum produto
  if (!loading && allproducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.defaultText}>Nenhum produto achado!</Text>
      </View>
    );
  }

  return <ProductsList productsList={allproducts} navigation={navigation} />;
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Todos Produtos',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={DefaultHeaderBtn}>
        <Item
          title="Menu"
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultText: {
    fontFamily: 'mont-regular',
    fontSize: 15,
  },
});

export default ProductsOverviewScreen;
