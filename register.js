// import { useState } from "react";
// import {
//   Alert,
//   Button,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";

// export function RegisterUI({ navigation }) {
//   const [getFirstName, setFirstName] = useState("");
//   const [getLastName, setLastName] = useState("");
//   const [getMobile, setMobile] = useState("");
//   const [getPassword, setPassword] = useState("");
//   const [getUserType, setUserType] = useState("");

//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//     { label: "Apple", value: "apple" },
//     { label: "Banana", value: "banana" },
//   ]);

//   getUserTypesFromType();
//   function getUserTypesFromType() {
//     fetch("http://192.168.1.112/vivaAppWeb/getusertype.php")
//       .then((response) => {
//         return response.json();
//       })
//       .then((usertypes) => {
//         var usertypeList = [];

//         usertypes.forEach((usertype) => {
//           var usertypeObject = {
//             label: usertype.name,
//             value: usertype.id,
//           };
//           usertypeList.push(usertypeObject);
//           //   Alert.alert("ok");
//         });
//         console.log(usertypeList);
//         setItems(usertypeList);
//       })
//       .catch((error) => {
//         console.error("Error", error);
//       });
//   }

//   function sendRequest() {
//     const registerDetails = {
//       firstname: getFirstName,
//       lastname: getLastName,
//       mobile: getMobile,
//       password: getPassword,
//       usertype: getUserType,
//     };

//     fetch("http://192.168.1.112/vivaAppWeb/index.php", {
//       method: "POST",
//       body: JSON.stringify(registerDetails),
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((user) => {
//         Alert.alert(user.firstname);
//       })
//       .catch((error) => {
//         // Alert.alert("Error", error);
//       });
//   }

//   const ui = (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.text1}>Login</Text>
//       <View>
//         <Text>first Name*</Text>
//         <TextInput
//           style={styles.TextInput}
//           onChangeText={(newFNText) => setFirstName(newFNText)}
//         />
//       </View>
//       <View>
//         <Text>Last Name*</Text>
//         <TextInput
//           style={styles.TextInput}
//           onChangeText={(newLNText) => setLastName(newLNText)}
//         />
//       </View>
//       <View>
//         <Text>Mobile*</Text>
//         <TextInput
//           style={styles.TextInput}
//           onChangeText={(newMText) => setMobile(newMText)}
//         />
//       </View>
//       <View>
//         <Text>Password*</Text>
//         <TextInput
//           style={styles.TextInput}
//           onChangeText={(newPText) => setPassword(newPText)}
//         />
//       </View>
//       <View>
//         <Text>User Type*</Text>
//         <DropDownPicker
//           style={styles.TextInput}
//           open={open}
//           value={value}
//           items={items}
//           setOpen={setOpen}
//           setValue={setValue}
//           setItems={setItems}

//           onChangeValue={() => {
//             // Alert.alert("Message", value);
//             setUserType(value);
//           }}
//         />
//       </View>
//       <View>
//         <Button onPress={sendRequest} title="Register" />
//       </View>
//     </SafeAreaView>
//   );
//   return ui;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text1: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   TextInput: {
//     height: 30,
//     borderWidth: 1,
//     width: 200,
//     marginBottom: 20,
//     padding: 5,
//   },
// });

import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export function RegisterUI({ navigation }) {
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getUserType, setUserType] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getUserTypesFromType();
  }, []);

  function getUserTypesFromType() {
    fetch("http://192.168.137.1/vivaAppWeb/getusertype.php")
      .then((response) => {
        return response.json();
      })
      .then((usertypes) => {
        var usertypeList = [];

        usertypes.forEach((usertype) => {
          var usertypeObject = {
            label: usertype.name,
            value: usertype.id.toString(), // Ensure that the value is a string
          };
          usertypeList.push(usertypeObject);
          //   Alert.alert("ok");
        });

        setItems(usertypeList);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }

  function sendRequest() {
    const registerDetails = {
      firstname: getFirstName,
      lastname: getLastName,
      mobile: getMobile,
      password: getPassword,
      usertype: getUserType,
    };
    console.log(registerDetails);
    fetch("http://192.168.137.1/vivaAppWeb/registeruser.php", {
      method: "POST",
      body: JSON.stringify(registerDetails),
    })
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        if (user.first_name == "success") {
          Alert.alert(user.first_name);
          navigation.navigate("Login")
        }else{
          Alert.alert(user.first_name);
        }
      })
      .catch((error) => {
        // Handle the error
        console.error("Error", error);
      });
  }

  const ui = (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text1}>Register</Text>
      <View>
        <Text>First Name*</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={(newFNText) => setFirstName(newFNText)}
        />
      </View>
      <View>
        <Text>Last Name*</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={(newLNText) => setLastName(newLNText)}
        />
      </View>
      <View>
        <Text>Mobile*</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={(newMText) => setMobile(newMText)}
        />
      </View>
      <View>
        <Text>Password*</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={(newPText) => setPassword(newPText)}
        />
      </View>
      <View>
        <Text>User Type*</Text>
        <DropDownPicker
          style={styles.TextInput}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={(val) => {
            setUserType(val);
          }}
        />
      </View>
      <View>
        <Button onPress={sendRequest} title="Register" />
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
});
