import React from "react";
import {View,TextInput} from 'react-native'
import styles from './Input.style'


const Input = ({placeholder,value,onType}) => {
    return (
        <View style={styles.contaier} >
            <TextInput style={styles.input} value={value} onChangeText={onType} placeholder={placeholder} placeholderTextColor="black" />
            
        </View>
    )
}

export default Input;