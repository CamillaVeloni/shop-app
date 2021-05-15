import React from 'react';
import { FlatList, Text, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { useSelector } from 'react-redux';
import DefaultHeaderBtn from '../../components/commons/DefaultHeaderBtn';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = () => {
  const userOrders = useSelector(({ order }) => order.orders);
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
          title="Drawer"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          iconSize={23}
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;
