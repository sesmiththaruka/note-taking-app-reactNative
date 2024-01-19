import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";

export function ViewUI({ navigation, route }) {
  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    fetch(
      "http://192.168.137.1/vivaAppWeb/getnote.php?userId=" + route.params.id
    )
      .then((response) => response.json())
      .then((notes) => {
        setNoteList(notes);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  const ui = (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList data={noteList} renderItem={userui} />
      </View>
    </SafeAreaView>
  );

  function userui({ item }) {
    const uii = (
      <View style={styles.itemMainView}>

        <View style={styles.subView1}>
          <Text>{item.date}</Text>
        </View>

        <View style={styles.subView2}>
          <View>
            <Image style={{ width: 70, height: 70, objectFit: "contain",  }} source={{ uri: item.imgpath }} />
          </View>
          <View style={{ marginStart:10 }}>
              <Text style={{ fontWeight: "bold",fontSize:20  }}>{item.title}</Text>
              <Text>{item.description}</Text>
          </View>
        </View>
        

        
        
      </View>
    );
    return uii;
  }

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
  view1: {
    alignItems: "flex-end",
  },
  view2: {
    marginTop: 10,
    alignItems: "flex-start",
  },
  view: {
    backgroundColor: "red",
    marginTop: 10,
  },
  itemMainView: {
    marginBottom: 10,
    marginEnd: 5,
    marginStart: 5,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor:'#F0F0F0'
    
  },
  subView1:{
    flex: 1, alignItems:'flex-end', padding:4
  },
  subView2:{
    flex: 1, 
    flexDirection: 'row',
    padding:10,
  },
});
