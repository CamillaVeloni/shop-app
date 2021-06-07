import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/order';
import Card from '../../components/commons/Card';
import CartItem from '../../components/shop/CartItem';
import DefaultBtn from '../../components/commons/DefaultBtn';
import DefaultText from '../../components/commons/DefaultText';
import Colors from '../../constants/Colors';

const CartScreen = () => {
  const cartTotalAmount = useSelector(({ cart }) => cart.totalAmount); // Pegando o preço final do carrinho
  const cartItems = useSelector(({ cart: { items } }) => {
    // Pegando os items do carrinho
    // fazer o selector retornar um array e não um objeto ~~ com o id incluso
    const transformedCart = [];
    for (const key in items) {
      transformedCart.push({
        productId: key,
        productTitle: items[key].productTitle,
        productPrice: items[key].productPrice,
        quantity: items[key].quantity,
        sum: items[key].sum,
      });
    }
    // Usando sort para ajeitar ordem pelo id 
    return transformedCart.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <CartItem
            qty={item.quantity}
            title={item.productTitle}
            amount={item.sum}
            deletable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(item.productId));
            }}
          />
        )}
      />
      <Card style={styles.containerCart}>
        <DefaultText ownStyle={styles.orderTextTotal}>
          Total do pedido:{' '}
          <DefaultText ownStyle={styles.orderTotal}>
            {cartTotalAmount.toFixed(2)} R$
          </DefaultText>
        </DefaultText>
        <DefaultBtn
          onPress={() => {
            dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
          }}
          disabled={cartItems.length === 0}
          label="Fazer o pedido"
          ownStyle={styles.orderTextBtn}
          ownBtnStyle={styles.orderBtn}
        />
      </Card>
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Meu Carrinho'
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20,
  },
  containerCart: {
    padding: 5,
    marginBottom: 10,
  },
  orderBtn: {
    margin: 10,
  },
  orderTextBtn: {
    fontSize: 15,
  },
  orderTextTotal: {
    fontFamily: 'mont-bold',
    alignSelf: 'center',
  },
  orderTotal: {
    color: Colors.accentColor,
  },
});

export default CartScreen;
