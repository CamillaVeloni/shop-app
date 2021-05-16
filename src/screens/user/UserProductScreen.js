import React from 'react';
import { FlatList, Platform, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import DefaultHeaderBtn from '../../components/commons/DefaultHeaderBtn';
import DefaultBtn from '../../components/commons/DefaultBtn';
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
          onDetailPress={() => console.log('EditProductScreen')}
        >
          <DefaultBtn
            onPress={() => console.log('EditProductScreen')}
            label="Editar Produto"
          />
          <DefaultBtn
            onPress={() => console.log('DeleteProduct')}
            label="Deletar Produto"
          />
        </ProductItem>
      )}
    />
  );
};

UserProductScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Meus Produtos',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={DefaultHeaderBtn}>
        <Item
          title="Drawer"
          iconSize={23}
          iconName={Platform.OS === 'android' ? 'md-menu' : 'md-ios'}
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default UserProductScreen;
