// import { StatusBar } from "expo-status-bar";
// import { Linking, StyleSheet, Text, View } from "react-native";
// import Trangchu from "./screen/trangchu";
// import { ScrollView } from "react-native";
// import { createStackNavigator } from "@react-navigation/stack";
// import LoginScreen from "./screen/LoginScreen";
// import RegisterScreen from "./screen/RegisterScreen";
// import ProfileScreen from "./screen/profileScreen";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import {
//     createStaticNavigation,
//     NavigationContainer,
//     useNavigation,
// } from "@react-navigation/native";
// import Detail from "./screen/detail";

// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator({
//     screens: {
//         Home: Trangchu,
//         Profile: ProfileScreen,
//     },
// });

// const Navigation = createStaticNavigation(Drawer);
// export default function App() {
//     return (
// <NavigationContainer>
//     <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen
//             name="Home"
//             component={Trangchu}
//             options={{ headerShown: false }}
//         />
//         <Drawer.Screen
//             name="Profile"
//             component={ProfileScreen}
//             options={{ headerShown: false }}
//         />
//         <Drawer.Screen
//             name="Detail"
//             component={Detail}
//             options={{ headerShown: false }}
//         />
//     </Drawer.Navigator>
// </NavigationContainer>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         backgroundColor: "#fff",
//         justifyContent: "center",
//     },
// });

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import * as Linking from "expo-linking";
import Trangchu from "./screen/trangchu";
import Dashboard from "./screen/Dashboard";
import CustomerManagement from "./screen/CustomerManagement";
import ProductManagement from "./screen/ProductManagement";
import OrderManagement from "./screen/OrderManagement";
import AnalyticsScreen from "./screen/AnalyticsScreen"; 
import CustomDrawerContent from "./component/admin/CustomDrawerContent";
import ProfileScreen from "./screen/profileScreen";
import Detail from "./screen/detail";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const linking = {
    prefixes: [Linking.createURL("/")],
    config: {
        screens: {
            Trangchu: "",
            Admin: {
                screens: {
                    Dashboard: "admin",
                    CustomerManagement: "admin/customermanager",
                    ProductManagement: "admin/productmanager",
                    OrderManagement: "admin/ordermanager",
                    Analytics: "admin/analytics",
                },
            },
        },
    },
};

const HomePage = () => {
    return (
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
                name="Admin"
                component={AdminStack}
                options={{ headerShown: false }}
            />
        </Drawer.Navigator>
    );
};

const AdminStack = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Dashboard"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{ headerShown: true }}
        >
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="CustomerManagement" component={CustomerManagement} />
            <Drawer.Screen name="ProductManagement" component={ProductManagement} />
            <Drawer.Screen name="OrderManagement" component={OrderManagement} />
            <Drawer.Screen name="AnalyticsScreen" component={AnalyticsScreen} />
        </Drawer.Navigator>
    );
};


export default function App() {
    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator initialRouteName="Trangchu">
                <Stack.Screen
                    name="Trangchu"
                    component={HomePage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Admin"
                    component={AdminStack}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
