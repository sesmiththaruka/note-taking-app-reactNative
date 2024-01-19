import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginUi } from "./Login";
import { HomeUI } from "./home";
import { NewnoteUI } from "./newnote";
import { ViewUI } from "./viewnote";
import { RegisterUI } from "./register";


const Stack = createNativeStackNavigator();

function app() {
  const ui = (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginUi} />
        <Stack.Screen name="Home" component={HomeUI}/>
        <Stack.Screen name="Newnote" component={NewnoteUI}/>
        <Stack.Screen name="Viewnote" component={ViewUI}/>
        <Stack.Screen name="Register" component={RegisterUI}/>
        
       
      </Stack.Navigator>
    </NavigationContainer>

  );
  return ui;
}

export default app;