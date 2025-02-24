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
import AppNavigator from "./navigation/AppNavigator";
import { CartProvider } from "./context/CartContext";
import FeedBack from "./screen/FeedBack";

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
                name="Detail"
                component={Detail}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="Admin"
                component={AdminStack}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="Feed Back"
                component={FeedBack}
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
            <Drawer.Screen
                name="CustomerManagement"
                component={CustomerManagement}
            />
            <Drawer.Screen
                name="ProductManagement"
                component={ProductManagement}
            />
            <Drawer.Screen name="OrderManagement" component={OrderManagement} />
            <Drawer.Screen name="AnalyticsScreen" component={AnalyticsScreen} />
        </Drawer.Navigator>
    );
};

export default function App() {
    return (
        <CartProvider>
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
                    <Stack.Screen
                        name="CartFlow"
                        component={AppNavigator}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </CartProvider>
    );
}
