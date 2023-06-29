import { StyleSheet,Dimensions } from "react-native"

export default StyleSheet.create ({
    container:{
        flex:1,
        backgroundColor:"lavender"
    },
    toplane:{
        alignItems: "flex-end",
        justifyContent: "flex-start",
        paddingRight: 10,
        paddingTop: 10,
    },
    
    mid:{
        padding:10,
        margin:10
    },

    touch:{
     width:100,     
    height:40,
    borderRadius: 20,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
      },
      bodycont:{
        backgroundColor:"gold"
      }
   
})