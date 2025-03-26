import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screen/HomeScreen";
import CartScreen from "../screen/CartScreen";
import CheckoutScreen from "../screen/CheckoutScreen";
import PaymentScreen from "../screen/PaymentScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
