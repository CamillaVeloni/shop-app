import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import CartItem from './CartItem';
import DefaultText from '../commons/DefaultText';
import DefaultBtn from '../commons/DefaultBtn';
import Colors from '../../constants/Colors';

const OrderItem = ({ amount, date, items }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.orderSummary}>
        <DefaultText>R${amount.toFixed(2)}</DefaultText>
        <DefaultText ownStyle={styles.orderDate}>{date}</DefaultText>
      </View>
      <DefaultBtn
        label={showDetails ? "Ocultar Informações" : "Mais Informações"}
        onPress={() => setShowDetails((prevState) => !prevState)}
      />
      {showDetails && (
        <View style={styles.orderDetails}>
          {items.map((item) => (
            <CartItem
              key={item.productId}
              qty={item.quantity}
              title={item.productTitle}
              amount={item.sum}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  orderDetails: {
    width: '100%'
  },
  orderDate: {
    color: Colors.grayishColor,
    fontSize: 14,
  },
});

export default OrderItem;
