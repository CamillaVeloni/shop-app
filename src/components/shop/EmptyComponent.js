import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DefaultBtn from '../commons/DefaultBtn';
import DefaultText from '../commons/DefaultText';

const EmptyComponent = ({ text, retryButton, onRetryPress }) => {
  return (
    <View style={styles.centered}>
      <DefaultText ownStyle={{ textAlign: 'center' }}>{text}</DefaultText>
      {retryButton && <DefaultBtn onPress={onRetryPress} label="Tentar novamente" />}
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
