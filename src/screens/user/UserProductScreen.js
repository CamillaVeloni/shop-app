import React from 'react';
import { FlatList, Platform, StyleSheet, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from '../../store/actions/products';
import DefaultHeaderBtn from '../../components/commons/DefaultHeaderBtn';
import DefaultBtn from '../../components/commons/DefaultBtn';
import ProductItem from '../../components/shop/ProductItem';

const UserProductScreen = ({ navigation }) => {
  const userProducts = useSelector(({ products }) => products.userProducts);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    Alert.alert(
      'Você tem certeza?',
      'Você tem certeza que gostaria de deletar esse produto?',
      [
        { text: 'Não', style: 'default' },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: () => dispatch(productsActions.deleteUserProduct(id)),
        },
      ]
    );
  };

  const editProductHandler = (id) =>
    navigation.navigate('EditProduct', { productId: id });

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          name={item.title}
          image={item.imageUrl}
          price={item.price}
          onDetailPress={() => editProductHandler(item.id)}
        >
          <DefaultBtn
            onPress={() => editProductHandler(item.id)}
            label="Editar Produto"
          />
          <DefaultBtn
            onPress={deleteHandler.bind(this, item.id)}
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
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={DefaultHeaderBtn}>
        <Item
          title="create"
          iconSize={23}
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => navigation.navigate('EditProduct')}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default UserProductScreen;
