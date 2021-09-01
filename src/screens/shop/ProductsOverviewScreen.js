import React, { useState, useEffect, useCallback } from 'react';
import { Platform, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as productsActions from '../../store/actions/products';
import * as cartActions from '../../store/actions/cart';
import DefaultHeaderBtn from '../../components/commons/DefaultHeaderBtn';
import ProductItem from '../../components/shop/ProductItem';
import DefaultBtn from '../../components/commons/DefaultBtn';
import Spinner from '../../components/commons/Spinner';
import EmptyComponent from '../../components/shop/EmptyComponent';

// Tela de Produtos ~~ Tem lógica para pegar os produtos do redux + de carregar a lista de produtos (até agora)
// Todos os produtos
const ProductsOverviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // state para loading inicial (enquanto espera produtos da database), refresh e para mensagem de erro
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState();

  // pegando os produtos do redux
  const allproducts = useSelector(({ products }) => products.availableProducts);

  // Função de fetch os produtos
  const loadProducts = useCallback(async () => {
    setError(null);
    setRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (error) {
      setError(error.message);
    }

    setRefreshing(false);
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

  // UseEffect para usar função loadProducts ~~ loading inicial
  useEffect(() => {
    setLoading(true);
    loadProducts().then(() => {
      setLoading(false);
    });
  }, [dispatch, loadProducts]);

  // Mostrar erro
  if (error) {
    return <EmptyComponent text={error} />;
  }
  // Mostrando spinner enquanto estiver esperando resposta do firebae
  if (loading) return <Spinner />;

  // Mostrar mensagem se não tiver nenhum produto
  if (!loading && allproducts.length === 0) {
    return <EmptyComponent text="Nenhum produto encontrado!" />;
  }

  // Navivegar para delalhes do produto ~~ usado em RenderItem
  const detailsItemHandler = (id, title) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      title: title,
    });
  };

  // Renderiza o componente ProductItem ~~ card de cada item
  const RenderItem = ({ item }) => {
    return (
      <ProductItem
        name={item.title}
        image={item.imageUrl}
        price={item.price}
        onDetailPress={() => detailsItemHandler(item.id, item.title)}
      >
        <DefaultBtn
          onPress={() => detailsItemHandler(item.id, item.title)}
          label="Detalhes"
        />
        <DefaultBtn
          onPress={() => {
            dispatch(cartActions.addToCart(item));
          }}
          label="Adicionar no carrinho"
        />
      </ProductItem>
    );
  };

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={refreshing}
      data={allproducts}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={RenderItem}
      style={{ width: '100%' }}
    />
  );
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
