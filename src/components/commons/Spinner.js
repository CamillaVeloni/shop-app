import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const Spinner = () => {
  return (
    <View style={styles.centered}>
      <ActivityIndicator color={Colors.primaryColor} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Spinner;
