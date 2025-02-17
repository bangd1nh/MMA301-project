import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from './screen/RegisterScreen'; 
import ProfileScreen from "./screen/profileScreen";
import Trangchu from "./screen/trangchu";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Trangchu" component={Trangchu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
