import React from "react";
import {View,Text,TouchableWithoutFeedback} from 'react-native'
import styles from "./RoomCard.style"
import Button from "../Button"



const RoomCard = ({roomname,roomid,onSelect,onPress}) => {
    
    return (
      <TouchableWithoutFeedback onPress={onSelect} >
    <View style={styles.container}  >   

        <View style={styles.bodycontainer}  >
            <Text style={styles.title} > Room name: {roomname} </Text>
            <Text  style={styles.title}> Room id: {roomid}  </Text>
            <Button theme="secondary" text="delete room" onPress={onPress} ></Button>
        </View>
    </View>
    </TouchableWithoutFeedback>
    )
}

export default RoomCard;