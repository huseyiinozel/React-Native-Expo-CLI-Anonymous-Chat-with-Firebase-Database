import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  container:{
    borderColor: 'red',
    borderWidth: 1,
    margin: 10,
    backgroundColor: colors.darkgreen,
    borderRadius: 10,
    padding: 10,

},
bodycontainer:{
  flex:1,
  padding:5,
  justifyContent:'space-between',
  

},
title:{
  fontWeight:'bold',
  fontSize:18,
  color:"black"

},
 
});
