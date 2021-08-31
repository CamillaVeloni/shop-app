import React from 'react';
import { Text, StyleSheet } from 'react-native';

const DefaultText = (props) => {
  const { children, ownStyle } = props;
  return (
    <Text {...props} style={[styles.default, ownStyle]} >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    fontFamily: 'mont-regular',
  },
});

export default DefaultText;
