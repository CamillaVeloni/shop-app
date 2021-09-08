import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { useDispatch, useSelector } from 'react-redux';
import * as orderActions from '../../store/actions/order';
import DefaultHeaderBtn from '../../components/commons/DefaultHeaderBtn';
import OrderItem from '../../components/shop/OrderItem';
import Spinner from '../../components/commons/Spinner';
import EmptyComponent from '../../components/shop/EmptyComponent';

const OrdersScreen = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const userOrders = useSelector(({ order }) => order.orders);

  const loadOrders = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      await dispatch(orderActions.fetchOrders());
    } catch (error) {
      console.log(error);
      setError(error.message);
    }

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders, dispatch]);

  // Mostrar spinner por enquanto que espera resposta da api
  if (loading) return <Spinner />;

  // Mostrar componente de erro na página
  if (!loading && error) {
    return <EmptyComponent text={error} retryButton onRetryPress={loadOrders}/>;
  }
  
  // Mostrar componente se o usuário ainda não fez nenhum pedido
  if (!loading && userOrders.length === 0) return <EmptyComponent text="Você ainda não fez nenhum pedido!" />;

  return (
    <FlatList
      data={userOrders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <OrderItem
          items={item.items}
          amount={item.totalAmount}
          date={item.readableDate}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

OrdersScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Meus Pedidos',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={DefaultHeaderBtn}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          iconSize={23}
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;
