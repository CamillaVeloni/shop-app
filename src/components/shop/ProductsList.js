import React from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';

import * as cartActions from '../../store/actions/cart'; 
import ProductItem from './ProductItem';

// Componente com FlatList para mostrar os produtos passados
const ProductsList = ({ productsList, navigation }) => {
  const dispatch = useDispatch();

  // Renderiza o componente ProductItem ~~ card de cada item
  const RenderItem = ({ item }) => {
    return (
      <ProductItem
        name={item.title}
        image={item.imageUrl}
        price={item.price}
        onDetailPress={() => {
          navigation.navigate('ProductDetail', {
            productId: item.id,
            title: item.title,
          });
        }}
        onAddToCart={() => {
          dispatch(cartActions.addToCart(item))
        }}
      />
    );
  };

  return (
    <FlatList
      data={productsList}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={RenderItem}
      style={{ width: '100%' }}
    />
  );
};

export default ProductsList;
