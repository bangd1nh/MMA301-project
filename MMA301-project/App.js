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
import CustomDrawerContent from "./component/admin/CustomDrawerContent";
import ProfileScreen from "./screen/profileScreen";
import Detail from "./screen/detail";
import AppNavigator from "./navigation/AppNavigator";
import { CartProvider } from "./context/CartContext";

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
        </Drawer.Navigator>
    );
};

function AdminStack() {
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
                options={{ title: "Quản lý khách hàng" }}
            />
            <Drawer.Screen
                name="ProductManagement"
                component={ProductManagement}
                options={{ title: "Quản lý sản phẩm" }}
            />
            <Drawer.Screen
                name="OrderManagement"
                component={OrderManagement}
                options={{ title: "Quản lý đơn hàng" }}
            />
            <Drawer.Screen
                name="Home page"
                component={HomePage}
                options={{ title: "Home page" }}
            />
        </Drawer.Navigator>
    );
}

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
