import React from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';

import DefaultBtn from '../commons/DefaultBtn';
import ProductItem from './ProductItem';
import * as cartActions from '../../store/actions/cart';

// Componente com FlatList para mostrar os produtos passados
const ProductsList = ({ productsList, navigation }) => {
  const dispatch = useDispatch();

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
      data={productsList}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={RenderItem}
      style={{ width: '100%' }}
    />
  );
};

export default ProductsList;
