import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from '../../store/actions/products';
import DefaultHeaderBtn from '../../components/commons/DefaultHeaderBtn';
import DefaultText from '../../components/commons/DefaultText';

const EditProductScreen = ({ navigation }) => {
  const id = navigation.getParam('productId');
  const editedProduct = useSelector(({ products }) =>
    products.userProducts.find((prod) => prod.id === id)
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ''
  );
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ''
  );

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      // Está no modo editar
      dispatch(
        productsActions.updateProduct(id, title, description, imageUrl)
      );
    } else {
      dispatch(
        productsActions.createProduct(title, description, imageUrl, +price)
      );
    }
  }, [dispatch, id, title, imageUrl, price, description]);

  // Setando action para header pelo setParams
  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <DefaultText ownStyle={styles.label}>Digite o nome do produto:</DefaultText>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(t) => setTitle(t)}
          />
        </View>
        <View style={styles.formControl}>
          <DefaultText ownStyle={styles.label}>Digite a imagem URL do produto:</DefaultText>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(t) => setImageUrl(t)}
          />
        </View>
        {!editedProduct && (
          <View style={styles.formControl}>
            <DefaultText ownStyle={styles.label}>Digite o preço do produto:</DefaultText>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              value={price}
              onChangeText={(t) => setPrice(t)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <DefaultText ownStyle={styles.label}>Digite uma descrição do produto:</DefaultText>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(t) => setDescription(t)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = ({ navigation }) => {
  const dynamicTitle = navigation.getParam('productId')
    ? 'Editar'
    : 'Adicionar';
  const submitHandler = navigation.getParam('submit');

  return {
    headerTitle: `${dynamicTitle} Produto`,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={DefaultHeaderBtn}>
        <Item
          title="Save"
          iconSize={23}
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitHandler}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
