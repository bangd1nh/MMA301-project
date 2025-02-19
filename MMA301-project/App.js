
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Trangchu from "./screen/trangchu";
import { ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "./screen/profileScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
    createStaticNavigation,
    NavigationContainer,
    useNavigation,
} from "@react-navigation/native";
import Detail from "./screen/detail";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator({
    screens: {
        Home: Trangchu,
        Profile: ProfileScreen,
    },
});

const Navigation = createStaticNavigation(Drawer);
export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen
                    name="Home"
                    component={Trangchu}
                    options={{ headerShown: false }}
                />
                <Drawer.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
                <Drawer.Screen
                    name="Detail"
                    component={Detail}
                    options={{ headerShown: false }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },

});
