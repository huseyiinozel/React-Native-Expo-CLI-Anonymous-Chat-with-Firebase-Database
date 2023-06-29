import { StyleSheet,Dimensions } from "react-native"
import colors from "../../styles/colors"
export default StyleSheet.create ({
    container:{
        backgroundColor:'white',
        flex:1
    },
    header:{
        color:colors.darkgreen,
        fontSize:Platform.OS === 'android' ? 120:160
    },
    logo_container:{
        flex:1,
        justifyContent:'center'
 
     },
   
     
     logo:{
        height:Dimensions.get('window').height/3,
        width:Dimensions.get('window').width,
        resizeMode:'contain',
        alignSelf:'center',
        
     }
   
})