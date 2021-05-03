import React from 'react'; 
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native'; 

const ProductItem = ({ name, image }) => { 

    return ( 
     <View style={styles.containerItem}> 
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => console.log('navigation Detail')}>
                        <Image source={{ uri: image }} style={styles.image}/>
                        <View>
                            <Text style={styles.title}>{ name }</Text>
                        </View>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity>
                    <Text>Detalhes</Text>
                </TouchableOpacity>
            </View>
        </View>
     </View>
)};

const styles = StyleSheet.create({
    containerItem: {
        flex: 1,
        width: '100%',
        margin: 10,
        marginVertical: 25
    },
    image: {
        width: '100%', 
        height: '100%'
    },
    header: {
        height: Dimensions.get('window').height >= 600 ? 180 : 160
    },
    title: {
        fontSize: 18
    }
});

export default ProductItem;
