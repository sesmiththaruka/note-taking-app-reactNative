import { useState, useEffect } from "react";
// import { useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export function NewnoteUI({ navigation, route }) {
  // textinput states
  const [getTitle, setTitle] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getCategory, setCategory] = useState("");
  // textinput states

  // dropdown states
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    // {label: 'Apple', value: 'apple'},
    // {label: 'Banana', value: 'banana'}
  ]);
  // dropdown states
  useEffect(() => {
    getCategoryfromdb();
  }, []);

  function getCategoryfromdb() {
    fetch("http://192.168.137.1/vivaAppWeb/getcategory.php")
      .then((response) => {
        return response.json();
      })
      .then((categories) => {
        var categoryList = [];

        categories.forEach((category) => {
          var categoryObject = {
            label: category.name,
            value: category.id,
          };
          // Alert.alert("ok");
          categoryList.push(categoryObject);
        });
        console.log(categoryList);
        setItems(categoryList);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }

  function sendNoteDataRequest() {
    const noteDetails = {
      title: getTitle,
      description: getDescription,
      category_id: getCategory,
      user_id: route.params.id,
    };

    fetch("http://192.168.137.1/vivaAppWeb/savenote.php", {
      method: "POST",
      body: JSON.stringify(noteDetails),
    })
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        Alert.alert(user.first_name);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }

  const ui = (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text1}>Add New Note</Text>
        <Text>welcome {route.params.first_name}</Text>
        {/* <Text>{route.params.id}</Text> */}
        {/* <Text>{route.params.last_name}</Text>
        <Text>{route.params.type}</Text> */}
      </View>
      <View style={styles.mainStyle}>
        <View
          style={{
            backgroundColor: "#F0F0F0",
            width: "100%",
            paddingHorizontal: 50,
          }}
        >
          <Text>Title</Text>
          <TextInput
            style={styles.TextInput}
            onChangeText={(newTText) => setTitle(newTText)}
          />

          <Text>Desciption</Text>
          <TextInput
            style={styles.TextInputDesciption}
            onChangeText={(newDText) => setDescription(newDText)}
          />
          <Text>Category</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={() => {
              setCategory(value);
            }}
          />
          {/* <Button style={{ backgroundColor:'red' }} onPress={sendNoteDataRequest} title="Save Note" /> */}

          <Pressable style={styles.pressable} onPress={()=>{sendNoteDataRequest()}} >
        <View style={styles.btnView}>
          <Text style={styles.btntext}>Save Note</Text>
        </View>
      </Pressable>

        </View>
      </View>

     
    </SafeAreaView>
  );
  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //   alignItems: 'center',
    //   justifyContent: 'center',
  },
  text1: {
    fontSize: 24,
    fontWeight: "bold",
  },
  TextInput: {
    height: 30,
    borderWidth: 1,
    width: "100%",
    marginBottom: 20,
    padding: 5,
  },
  TextInputDesciption:{
    height: 50,
    borderWidth: 1,
    width: "100%",
    marginBottom: 20,
    padding: 5,
  },
  mainStyle: {
    // alignContent: "center",
    // alignItems: "center",
    paddingBottom: 15,
    
  },
  pressable:{
    marginTop:20,
    width:'86%',
    height:40,
    backgroundColor:'black',
    alignItems: "center",
    justifyContent: "center",
    borderBottomEndRadius:300,
    borderTopEndRadius:300,
  },

  btntext: {
    fontSize: 18,
    fontWeight: "bold",
    color:'white'
  }
});
