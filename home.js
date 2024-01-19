import { Alert, Button, Dimensions, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export function HomeUI({ navigation, route }) {
  
  async function saveDataToLocalStorage() {
    Alert.alert("Logout")
    try {
        await AsyncStorage.removeItem('user');
        navigation.navigate("Login")
      } catch (error) {
        console.error('Error saving user data:', error);
      }
  }

  const ui = (
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.text1}>home</Text>
      <Text>{route.params.first_name}</Text>
      <Text>{route.params.last_name}</Text>
      <Text>{route.params.type}</Text>
      <View>
      <Pressable style={styles.pressable} onPress={()=>{navigation.navigate("Newnote",route.params)}} >
        <View style={styles.btnView}>
          <Text style={styles.btntext}>Add New Note</Text>
        </View>
      </Pressable>
      </View>
      <View>
      <Pressable style={styles.pressable} onPress={()=>{navigation.navigate("Viewnote",route.params)}} >
        <View style={styles.btnView}>
          <Text style={styles.btntext}>View Note</Text>
        </View>
      </Pressable>
      </View>
      <View>
      <Pressable style={styles.pressable} onPress={()=>{saveDataToLocalStorage()}} >
        <View style={styles.btnView}>
          <Text style={styles.btntext}>LogOut</Text>
        </View>
      </Pressable>
        
      </View>
    </SafeAreaView>
  );
  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    //   alignItems: 'center',
    //   justifyContent: 'center',
  },
  text1: {
    fontSize: 24,
    fontWeight: "bold",
  },
  pressable:{
    marginTop:10,
    width:'56%',
    height:80,
    backgroundColor:'black',
    alignItems: "center",
    justifyContent: "center",
    borderBottomEndRadius:300,
    borderTopEndRadius:300,
  },

  btntext: {
    fontSize: 20,
    fontWeight: "bold",
    color:'white'
  }
});
