import React from 'react';
import { StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as cartActions from '../../store/actions/cart';
import DefaultBtn from '../../components/commons/DefaultBtn';
import DefaultText from '../../components/commons/DefaultText';

const ProductDetailScreen = ({ navigation }) => {
  const dispatch = useDispatch(); // conseguindo acesso ao dispatch function

  // Pegando id do produto pelo navigation
  const prodId = navigation.getParam('productId');
  // Usando hook do react-redux para procurar dentro do reducer state.products.availableProducts
  // Usando também metodo do javascript para achar o produto pelo prodId
  const selectedProduct = useSelector(({ products }) =>
    products.availableProducts.find((prod) => prod.id === prodId)
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <DefaultBtn
        ownBtnStyle={styles.button}
        onPress={() => dispatch(cartActions.addToCart(selectedProduct))}
        label="Adicionar no carrinho"
      />
      <DefaultText ownStyle={styles.price}>
        {selectedProduct.price.toFixed(2)} R$
      </DefaultText>
      <DefaultText ownStyle={styles.description}>
        {selectedProduct.description}
      </DefaultText>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam('title');

  return {
    headerTitle: title,
  };
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').height / 2,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
