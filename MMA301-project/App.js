import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import Trangchu from './screen/trangchu'; // Home page
import Dashboard from './screen/Dashboard';
import CustomerManagement from './screen/CustomerManagement';
import ProductManagement from './screen/ProductManagement';
import OrderManagement from './screen/OrderManagement';
import CustomDrawerContent from './component/admin/CustomDrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const linking = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Trangchu: '',
      Admin: {
        screens: {
          Dashboard: 'admin',
          CustomerManagement: 'admin/customermanager',
          ProductManagement: 'admin/productmanager',
          OrderManagement: 'admin/ordermanager',
        },
      },
    },
  },
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
        options={{ title: 'Quản lý khách hàng' }}
      />
      <Drawer.Screen
        name="ProductManagement"
        component={ProductManagement}
        options={{ title: 'Quản lý sản phẩm' }}
      />
      <Drawer.Screen
        name="OrderManagement"
        component={OrderManagement}
        options={{ title: 'Quản lý đơn hàng' }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Trangchu">
        <Stack.Screen name="Trangchu" component={Trangchu} options={{ headerShown: false }} />
        <Stack.Screen name="Admin" component={AdminStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
