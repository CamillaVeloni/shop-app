import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from '../../store/actions/products';
import DefaultHeaderBtn from '../../components/commons/DefaultHeaderBtn';
import DefaultBtn from '../../components/commons/DefaultBtn';
import ProductItem from '../../components/shop/ProductItem';
import Spinner from '../../components/commons/Spinner';

const UserProductScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const userProducts = useSelector(({ products }) => products.userProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('Um erro aconteceu!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const deleteHandler = (id) => {
    Alert.alert(
      'Você tem certeza?',
      'Você tem certeza que gostaria de deletar esse produto?',
      [
        { text: 'Não', style: 'default' },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: async () => {
            setError(null);
            setLoading(true);
            try {
              await dispatch(productsActions.deleteUserProduct(id));
            } catch (error) {
              setError(error.message);
            }

            setLoading(false);
          },
        },
      ]
    );
  };

  const editProductHandler = (id) =>
    navigation.navigate('EditProduct', { productId: id });

  // Mostrando spinner
  if (loading) return <Spinner />;

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
