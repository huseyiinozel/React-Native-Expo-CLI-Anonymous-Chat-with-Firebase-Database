import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, ScrollView } from "react-native";
import styles from "./Main.style";
import Button from "../../components/Button/Button";
import { getAuth } from "firebase/auth";
import Input from "../../components/Input/Input";
import RoomCard from "../../components/RoomCard/RoomCard";
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import ParseContent from "../../utils/parseContent"
import { showMessage } from "react-native-flash-message";

import { ref, push,onValue,off,update,get,orderByChild,set,remove } from 'firebase/database';
import { query, equalTo} from 'firebase/database';

function Main({ navigation }) {
  

  
const firebaseConfig = {
  /* ****** */
};

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const auth = getAuth();

  const [roomname, setRoomname] = useState("");
  const [contentlist, setContentList] = useState([]);
  const [datakey, setDatakey] = useState([]);
  const databaseRef = ref(database, 'rooms');
  const [currentUserRooms, setCurrentUserRooms] = useState([]);
  const [roomid, setRoomid] = useState(null);

  useEffect(() => {
    const roomsRef = ref(database, 'room');

    const onDataChange = (snapshot) => {
      const roomData = snapshot.val();
      const parsedData = ParseContent(roomData || {});

      const filteredData = parsedData.filter((room) => {
        if (Array.isArray(room.users)) {
          return room.users.includes(auth.currentUser.email);
        } else if (typeof room.users === "object") {
          return Object.values(room.users).includes(auth.currentUser.email);
        }
        return false;
      });

      setContentList(filteredData);
    };

    onValue(roomsRef, onDataChange);

    return () => {
      off(roomsRef, onDataChange);
    };
  }, []);
  


  


 
 const saveDataToDatabase = () => {

  
  const user = auth.currentUser.email;
  
  const dataRef = ref(database, "room");
  
  const data = {
    roomid: Math.floor(Math.random() * 100000) + 1,
    createuser: user.split("@")[0],
    roomname: roomname,
    users: [user],
    messages:[] 
  };
  
    

    
    
    push(dataRef, data)
     
      .then((newDataRef) => {
        const newDataKey = newDataRef.key;
        setRoomkeys((prevRooms) => [...prevRooms, newDataKey]); 
        
        setDatakey(newDataKey)
        setRoomname("");
        showMessage({
          message: "Success",
          type: "success"
        });

      })
      .catch((error) => {
        showMessage({
          message: "Success",
          type: "success"
        });
      });
  };

  function handleLogout() {
    auth.signOut()
      .then(() => {
        
        
        
        navigation.navigate("LoginPage")
      })
      .catch((error) => {
        
        
        
      });
  }
  
  function gotoMessage(id, datakey) {
    navigation.navigate("MessagesPage", { id, datakey });
  }
  
  const deleteroom = (item) => {
    const user = auth.currentUser.email;
  
    const roomsRef = ref(database, 'room');
    const roomQuery = query(roomsRef, orderByChild('roomid'), equalTo(parseInt(item.roomid)));
  
    get(roomQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const roomKey = Object.keys(snapshot.val())[0];
          const userKey = user.replace(".", "-").replace("@", "@").replace(".", ".");
  
          const userRef = ref(database, `room/${roomKey}/`);
          remove(userRef)
            .then(() => {
              showMessage({
                message: "Success",
                type: "success"
              });
            })
            .catch((error) => {
              showMessage({
                message: "Error",
                description: error.message,
                type: "danger"
              });
              
            });
        } else {
          
        }
      })
      .catch((error) => {
        
      });
  };
  
  
  
  
 
  const flatrender = ({item}) => <RoomCard roomid={item.roomid} roomname={item.roomname} onPress={() => deleteroom(item)}  onSelect={() => gotoMessage(item.roomid)} ></RoomCard>
  
  function addRoomid() {
    const user = auth.currentUser.email;
  
    if (!roomid) {
      
      return;
    }
  
    const roomsRef = ref(database, 'room');
    const roomQuery = query(roomsRef, orderByChild('roomid'), equalTo(parseInt(roomid)));
  
    get(roomQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const roomKey = Object.keys(snapshot.val())[0];
          const userKey = user.replace(".", "-").replace("@", "@").replace(".", ".");

          const userRef = ref(database, `room/${roomKey}/users/${userKey}`);
          set(userRef, user)
            .then(() => {
              showMessage({
                message: "Success",
                type: "success"
              });
              
            })
            .catch((error) => {
              
            });
        } else {
          
        }
      })
      .catch((error) => {
        
      });
  }
  
  
  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
       
      <View style={styles.bodycont}>
        <View style={styles.toplane}>
          <TouchableOpacity style={styles.touch} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      
      <View style={styles.mid}>
        <Input placeholder="Room name"  value={roomname} onType={setRoomname}></Input>
        <Button text="Create Room" onPress={saveDataToDatabase}></Button>
        <Input placeholder="Room Id"  onType={setRoomid}></Input>
        <Button text="Join Room"  onPress={addRoomid}></Button>
        
        
        <FlatList data={contentlist} renderItem={flatrender} />
        
      </View>
      
    </SafeAreaView>
    </ScrollView>
  );
}

export default Main;
