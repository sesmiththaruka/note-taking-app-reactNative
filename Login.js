import { useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,

} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';



export function LoginUi({navigation}) {
  const [getUserName, setUsername] = useState("");
  const [getPassword, setPassword] = useState("");

  retrieveDataFromLocalStorage()  
  async function saveDataToLocalStorage(user) {
    
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        retrieveDataFromLocalStorage();
      } catch (error) {
        console.error('Error saving user data:', error);
      }
  }

  async function retrieveDataFromLocalStorage() {
    try {
      const userString = await AsyncStorage.getItem('user');
      
      if (userString !== null) {
        const user = JSON.parse(userString);
        navigation.navigate("Home",user)
        // Alert.alert('User Data', user.first_name);
        // Alert.alert(user.last_name)
      } else {
        // Alert.alert('User data not found.');
        navigation.navigate("Login")
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  }

  function sendRequest() {
    // Alert.alert(getUserName);
    // Alert.alert(getPassword);
    const loginDetails = {
        "username":getUserName,
        "password":getPassword
      };

      fetch("http://192.168.137.1/vivaAppWeb/index.php",
      {
        method: "POST",
        body:JSON.stringify(loginDetails)
      })
      .then((response) => {
        return response.json();
      })
      .then((user) => {
       
   
        if (user.first_name !== "nope") {
            // Alert.alert(user.first_name)
            saveDataToLocalStorage(user);
            Alert.alert("success");
            navigation.navigate("Home",user);
        } else {
            Alert.alert("Invalid login details", "Please check your username and password");
        }
        
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }

  const ui = (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text1}>Login</Text>
      <View>
        <Text>Mobile Number</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={(newUText) => setUsername(newUText)}
        />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={(newPText) => setPassword(newPText)}
        />
      </View>
      <View>
        <Button onPress={sendRequest} title="Sign In" />
      </View>
      <View style={styles.btnview}>
        <Button onPress={()=>{
          Alert.alert("ok");
          navigation.navigate("Register");
        }} title="Sign Up" />
      </View>
    </SafeAreaView>
  );
  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    fontSize: 24,
    fontWeight: "bold",
  },
  TextInput: {
    height: 30,
    borderWidth: 1,
    width: 200,
    marginBottom: 20,
    padding: 5,
  },
  btnview:{
    marginTop:40,
  },
 
});


