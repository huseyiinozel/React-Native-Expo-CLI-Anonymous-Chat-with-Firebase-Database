import React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/pages/Login"
import Sign from "./src/pages/Sign"
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import 'firebase/firestore'; 
import FlashMessage from "react-native-flash-message";
import Main from "./src/pages/Main"
import { getAuth } from "firebase/auth";
import Messages from "./src/pages/Messages"



const firebaseConfig = {
  /* ****** */
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

const Stack = createStackNavigator();
const auth = getAuth();

const AuthStack = () => {
    return (
      <Stack.Navigator   screenOptions={{headerShown:false}}>
      <Stack.Screen name ="LoginPage" component={Login} />
      <Stack.Screen name ="SignPage" component={Sign} />
      
    </Stack.Navigator>
    )
  }

  const MainStack = () => {
    return (
      <Stack.Navigator   screenOptions={{headerShown:false}}>
      <Stack.Screen name ="MainPage" component={Main} />
      <Stack.Screen name ="MessagesPage" component={Messages} />
      
    </Stack.Navigator>
    )
  }


  


function Router () {
  const [userSesion,setUserSession] = React.useState();

  React.useEffect(() => {
    auth.onAuthStateChanged(user=>{
      setUserSession(!!user);
    })

  },[])
  

    return(
        <NavigationContainer>
            <Stack.Navigator>
              {
                !userSesion ? (
              
            <Stack.Screen name="AuthStack" component={AuthStack} options={{headerShown:false}}></Stack.Screen>
                ) : (
            <Stack.Screen name="MainStack" component={MainStack} options={{headerShown:false}}></Stack.Screen>
            
                ) }
            </Stack.Navigator>
            <FlashMessage position="top" ></FlashMessage>
        </NavigationContainer>
       

    )
}

export default Router;