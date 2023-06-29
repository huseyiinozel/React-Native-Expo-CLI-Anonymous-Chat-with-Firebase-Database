import React from "react";
import {View,Text,TouchableOpacity} from 'react-native'
import styles from "./MessageCard.style"


const MessageCard = ({message,user}) => {

    return (
      
        <View style={styles.container} >
        <View style={styles.inner_container}>
          <Text style={styles.user}>{user}</Text>
        </View>
        <Text style={styles.title}>{message}</Text>
      </View>
    )
}

export default MessageCard;