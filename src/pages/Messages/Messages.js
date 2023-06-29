import React,{useState,useEffect} from "react";
import { SafeAreaView,Text,View,FlatList } from "react-native";
import styles from "./Messages.style"
import Input from "../../components/Input"
import Button  from "../../components/Button"
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { showMessage } from "react-native-flash-message";
import {
  ref,
  onValue,
  push,
  update,
  remove,
  query, equalTo, get,orderByChild
} from 'firebase/database';
import MessageCard from "../../components/MessageCard"


const firebaseConfig = {
  /* ****** */
};
  
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app)
  const auth = getAuth();


function Messages ({route}) {
    const [message,setMessage] = useState("")
    const { id, datakey } = route.params;
    const [messagelist,setMessagelist] = useState([])
    const [user,setUser] = useState("")


  

    function handlesend() {
      const roomRef = ref(database, 'room');
      const queryRef = query(roomRef, orderByChild('roomid'), equalTo(id));
    
      get(queryRef)
        .then((snapshot) => {
          const roomData = snapshot.val();
          if (roomData) {
            const roomId = Object.keys(roomData)[0];
            const dataRef = ref(database, `room/${roomId}/messages`);
            const newMessage = {
              message: message,
              user: parsemail 
            };
    
            push(dataRef, newMessage)
              .then((newMessageRef) => {
                const newMessageKey = newMessageRef.key;
                
                setMessage('');
              })
              .catch((error) => {
                
              });
          } else {
            
          }
        })
        .catch((error) => {
          
        });
    }
    
    
      useEffect(() => {
        const roomRef = ref(database, 'room');
        const queryRef = query(roomRef, orderByChild('roomid'), equalTo(id));
      
        const unsubscribe = onValue(queryRef, (snapshot) => {
          const roomData = snapshot.val();
          if (roomData) {
            const roomId = Object.keys(roomData)[0];
            const messageRef = ref(database, `room/${roomId}/messages`);
      
            const messageUnsubscribe = onValue(messageRef, (messageSnapshot) => {
              const data = messageSnapshot.val();
              if (data) {
                const messageList = Object.values(data);
                setMessagelist(messageList);
              }
            });
      
            return () => {
              messageUnsubscribe();
            }; 
          } else {
            setMessagelist([]);
          }
        });
      
        return () => {
          unsubscribe();
        };
      }, [id]);
      
      
        function handleadd() {
            const roomRef = ref(database, 'room');
            const queryRef = query(roomRef, orderByChild('roomid'), equalTo(id));
          
            get(queryRef)
              .then((snapshot) => {
                const roomData = snapshot.val();
                if (roomData) {
                  const roomId = Object.keys(roomData)[0];
                  const usersRef = ref(database, `room/${roomId}/users`);
                  const newUser = user  ;
          
                  update(usersRef, { [newUser]: user + "@mail.com" })
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
          

      




      const  parsemail = auth.currentUser.email.split("@")[0]
      const flatrender = ({ item }) => <MessageCard message={item.message} user={item.user}></MessageCard>

    return (
        <SafeAreaView style={styles.container}>
            <Input placeholder="User Add" onType={setUser}></Input>
            <Button text="Add"  onPress={handleadd}></Button>
            <Text>{datakey}</Text>
            <FlatList 
            data={messagelist}
            renderItem={flatrender}
            
            
            />





            <Input onType={setMessage}  placeholder="Message" value={message} ></Input>
            <Button text="Send" onPress={handlesend} ></Button>
        </SafeAreaView>
    )
}


export default Messages;