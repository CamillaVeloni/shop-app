import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';

import DefaultText from '../commons/DefaultText';
import DefaultBtn from '../commons/DefaultBtn';
import Colors from '../../constants/Colors';

// Card de cada produto
const ProductItem = ({ name, image, price, onDetailPress, onAddToCart }) => {
  // Adicionando ripple effect para android
  let TouchableComp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) TouchableComp = TouchableNativeFeedback;

  return (
    <TouchableComp onPress={onDetailPress} useForeground>
      <View style={styles.containerItem}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={styles.detail}>
          <DefaultText ownStyle={styles.title}>{name}</DefaultText>
          <DefaultText ownStyle={styles.price}>{price.toFixed(2)} R$</DefaultText>
        </View>
        <View style={styles.detailButtons}>
          <DefaultBtn onPress={onDetailPress} label='Detalhes'/>
          <DefaultBtn onPress={onAddToCart} label='Adicionar no carrinho' />
        </View>
      </View>
    </TouchableComp>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    height: Dimensions.get('window').height >= 600 ? 300 : 250,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: Dimensions.get('window').height >= 600 ? '60%' : '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detail: {
    alignItems: 'center',
    height: Dimensions.get('window').height >= 600 ? '15%' : '25%',
    padding: 10,
  },
  title: {
    fontFamily: 'mont-bold'
  },
  price: {
    fontSize: 14,
    fontFamily: 'mont-italic',
    color: Colors.priceColor,
  },
  detailButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '25%',
  },
});

export default ProductItem;
