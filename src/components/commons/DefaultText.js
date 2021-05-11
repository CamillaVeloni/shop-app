import React from 'react'; 
import { Text, StyleSheet} from 'react-native'; 

const DefaultText = ({ children, ownStyle, numberOfLines }) => { 
    return <Text style={[styles.default, ownStyle]} numberOfLines={numberOfLines}>{children}</Text>;
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        fontFamily: 'mont-regular',
    }   
});

export default DefaultText;
