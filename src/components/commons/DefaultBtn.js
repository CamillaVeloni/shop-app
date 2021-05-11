import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import DefaultText from '../commons/DefaultText';
import Colors from '../../constants/Colors';

const DefaultBtn = ({
  children,
  onPress,
  label,
  ownStyle,
  ownBtnStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        disabled
          ? { ...styles.buttonWrapper, ...styles.buttonDisable }
          : styles.buttonWrapper,
        ownBtnStyle,
      ]}
      onPress={onPress}
    >
      {children ? (
        children
      ) : (
        <DefaultText ownStyle={[styles.buttonText, ownStyle]}>
          {label}
        </DefaultText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    padding: 10,
    backgroundColor: Colors.accentColor,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonDisable: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default DefaultBtn;
