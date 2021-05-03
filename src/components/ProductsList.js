import React from 'react'; 
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'; 

import ProductItem from '../components/ProductItem';
import PRODUCTS from '../data/dummy-data';

const RenderItem = ({ item }) => {
    return (
    <ProductItem 
        name={item.name}
        image={item.imageURL}
    />
    );
}

const ProductsList = ({ title }) => { 
    return ( 
    <View style={styles.container}>
        <FlatList 
            data={PRODUCTS}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={RenderItem}
            style={{ width: '100%' }}
        /> 
    </View>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
    },
});

export default ProductsList;
