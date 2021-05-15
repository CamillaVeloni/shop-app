import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

const UserProductScreen = () => {
  const userProducts = useSelector(({ products }) => products.userProducts);

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          name={item.title}
          image={item.imageUrl}
          price={item.price}
          onDetailPress={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default UserProductScreen;
