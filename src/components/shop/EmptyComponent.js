import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DefaultText from '../commons/DefaultText';

const EmptyComponent = ({ text }) => {
  return (
    <View style={styles.centered}>
      <DefaultText ownStyle={{ textAlign: 'center' }}>{text}</DefaultText>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
});

export default EmptyComponent;
