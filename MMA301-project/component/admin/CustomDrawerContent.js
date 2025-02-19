import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Avatar
          rounded
          size="medium"
          source={{ uri: 'https://tse1.mm.bing.net/th?id=OIP.V0NH3fa-mZ4AJ94SEQTy_wHaHa&pid=Api&P=0&h=220' }}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Admin</Text>
          <Text style={styles.userGreeting}>Chào mừng bạn trở lại</Text>
        </View>
      </View>
      <DrawerItem
        label="Bảng điều khiển"
        icon={({ color, size }) => (
          <Icon name="dashboard" color={color} size={size} />
        )}
        onPress={() => props.navigation.navigate('Dashboard')}
      />
      <DrawerItem
        label="Quản lý khách hàng"
        icon={({ color, size }) => (
          <Icon name="users" type="feather" color={color} size={size} />
        )}
        onPress={() => props.navigation.navigate('CustomerManagement')}
      />
      <DrawerItem
        label="Quản lý sản phẩm"
        icon={({ color, size }) => (
          <Icon name="box" type="feather" color={color} size={size} />
        )}
        onPress={() => props.navigation.navigate('ProductManagement')}
      />
      <DrawerItem
        label="Quản lý đơn hàng"
        icon={({ color, size }) => (
          <Icon name="shopping-cart" type="feather" color={color} size={size} />
        )}
        onPress={() => props.navigation.navigate('OrderManagement')}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ededed',
    marginBottom: 10,
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userGreeting: {
    fontSize: 14,
    color: '#666',
  },
});
