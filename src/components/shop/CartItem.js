import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DefaultBtn from '../commons/DefaultBtn';
import DefaultText from '../commons/DefaultText';

const CartItem = ({ deletable, onRemove, qty, title, amount }) => {
  return (
    <View style={styles.cartItem}>
      <View style={[styles.itemData, { width: '50%'}]}>
        <DefaultText ownStyle={styles.quantity}>{qty} </DefaultText>
        <DefaultText ownStyle={styles.defaultText} numberOfLines={1}>{title}</DefaultText>
      </View>
      <View style={styles.itemData}>
        <DefaultText ownStyle={styles.defaultText}>{amount.toFixed(2)} R$</DefaultText>
        {deletable && <DefaultBtn onPress={onRemove} ownBtnStyle={styles.deleteBtn}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color="red"
          />
        </DefaultBtn>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    cartItem: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        borderColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteBtn: {
        marginLeft: 20,
        padding: 0,
        backgroundColor: 'transparent'
    },
    defaultText: {
        fontFamily: 'mont-bold',
        fontSize: 15,
    },
    quantity: {
        color: '#888',
        fontSize: 14
    },
});

export default CartItem;
