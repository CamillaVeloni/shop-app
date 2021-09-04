import React, { useEffect, useReducer } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import DefaultText from '../../components/commons/DefaultText';

const INPUT_CHANGE = 'inputChange';
const INPUT_BLUR = 'inputBlur';

const inputReducer = (state, action) => {
  // reducer do inputState
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};
const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    // input reducer
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputChange, id } = props;
  useEffect(() => {
    // no component 'pai' tem uma função que irá 'escutar' e ser executar quando o input for clicado (inputState.touched) e
    // depois perder o focus
    // e vai receber esses dois props (inputState.value, inputState.isValid)
    /* if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    } */
    if (inputState.touched || inputState.value.length != 0) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [id, inputState, onInputChange]);

  /*
    Ou para isso se quiser que não haja o erro do ultimo input:
    useEffect(() => {
        onInputChange(id, inputState.value, inputState.isValid);
    }, [inputState, onInputChange, id]);

    You will lose some performance, because you will check the form validity every time you change a word in a field, however I think It's worth it.
  */

  const textChangeHandler = (text) => {
    // dispatch para o state reducer
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid: isValid,
    });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <DefaultText ownStyle={styles.label}>{props.label}</DefaultText>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <DefaultText ownStyle={styles.validateText}>
          {props.errorText}
        </DefaultText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    marginVertical: 10,
    fontFamily: 'mont-bold',
  },
  validateText: {
    fontSize: 13,
    color: 'red',
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    margin: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default Input;
