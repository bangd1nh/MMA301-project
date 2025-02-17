import React from "react";
import { StatusBar } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </CartProvider>
  );
};

export default App;
