import React, { useEffect, useCallback, useReducer } from 'react';
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from '../../store/actions/products';
import DefaultHeaderBtn from '../../components/commons/DefaultHeaderBtn';
import Input from '../../components/commons/Input';

const FORM_INPUT_UPDATE = 'update';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true; // se o valor for 'overrided' então não volta a ser true
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]; // updatedValidities[key] SE for falso então o form não tá valido
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

const EditProductScreen = ({ navigation }) => {
  const id = navigation.getParam('productId');
  const editedProduct = useSelector(({ products }) =>
    products.userProducts.find((prod) => prod.id === id)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    // formulário reducer
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      description: editedProduct ? editedProduct.description : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      price: '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      description: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    // dispatch criar ou editar produto
    if (!formState.formIsValid) {
      // verificando validação do formulário
      Alert.alert(
        'Erro na validação',
        'Por favor, verifique os erros no formulário.',
        [{ text: 'Ok' }]
      );
      return;
    }
    if (editedProduct) {
      // Está no modo editar
      dispatch(
        productsActions.updateProduct(
          id,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        productsActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    navigation.goBack(); // navegar para Meus Produtos
  }, [dispatch, id, formState]);

  // Setando action para header pelo setParams
  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  // Função para usar o reducer dispatch ~~ ver: textInput
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Digite o titulo do produto:"
            errorText="Por favor, digite um titulo válido"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            required
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
          />
          <Input
            id="imageUrl"
            label="Digite a url da imagem do produto:"
            errorText="Por favor, digite uma url válida"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            required
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
          />
          {!editedProduct && (
            <Input
              id="price"
              label="Digite o preço do produto:"
              errorText="Por favor, digite um preço válido"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Digite uma descrição do produto:"
            errorText="Por favor, digite uma descrição válida"
            keyboardType="default"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
});

export default EditProductScreen;
