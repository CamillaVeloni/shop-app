import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';

import Card from '../commons/Card';
import DefaultText from '../commons/DefaultText';
import Colors from '../../constants/Colors';

// Card de cada produto
const ProductItem = ({ children, name, image, price, onDetailPress }) => {
  // Adicionando ripple effect para android
  let TouchableComp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) TouchableComp = TouchableNativeFeedback;

  return (
    <Card style={styles.containerItem}>
    <TouchableComp onPress={onDetailPress} useForeground>
      <View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={styles.detail}>
          <DefaultText ownStyle={styles.title}>{name}</DefaultText>
          <DefaultText ownStyle={styles.price}>{price.toFixed(2)} R$</DefaultText>
        </View>
        <View style={styles.actionsButtons}>
          {children}
        </View>
      </View>
    </TouchableComp>
    </Card>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    height: Dimensions.get('window').height >= 600 ? 300 : 250,
    marginVertical: 10,
    marginHorizontal: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: Dimensions.get('window').height >= 600 ? '60%' : '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detail: {
    alignItems: 'center',
    height: Dimensions.get('window').height >= 600 ? '15%' : '25%',
    padding: 10,
  },
  title: {
    fontFamily: 'mont-bold'
  },
  price: {
    fontSize: 14,
    fontFamily: 'mont-italic',
    color: Colors.grayishColor,
  },
  actionsButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '25%',
  },
});

export default ProductItem;
