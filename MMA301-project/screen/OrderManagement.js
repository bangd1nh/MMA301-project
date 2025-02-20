import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';

export default function OrderManagement({ navigation }) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const dayNames = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
      const dayName = dayNames[now.getDay()];
      const date = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${dayName}, ${date}/${month}/${year} - ${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

   React.useLayoutEffect(() => {
     navigation.setOptions({
       title: "",
       headerLeft: () => (
         <Icon name="menu" size={24} onPress={() => navigation.toggleDrawer()} containerStyle={{ marginLeft: 10 }} />
       ),
       headerRight: () => (
         <Icon name="home" size={24} onPress={() => navigation.navigate("Home")} containerStyle={{ marginRight: 10 }} />
       ),
     });
   }, [navigation]);

  const orders = [
    {
      id: 25,
      customer: 'Kweeen',
      phone: '(+84)796510005',
      address: 'Hoa Hai',
      date: '2024-03-18',
      total: '7,036,863 VND',
      payment: 'COD',
    },
    {
      id: 26,
      customer: 'Jane Doe',
      phone: '(+84)796510999',
      address: 'Hoa Hai',
      date: '2024-03-19',
      total: '3,236,789 VND',
      payment: 'Credit Card',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quản lý đơn hàng</Text>
        <Text style={styles.time}>{currentTime}</Text>
      </View>

      <Text style={styles.sectionTitle}>Danh sách đơn hàng</Text>

      {orders.map((order) => (
        <Card key={order.id} containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>Đơn hàng #{order.id}</Card.Title>
          <Card.Divider />
          <Text style={styles.text}><Text style={styles.label}>Khách hàng:</Text> {order.customer}</Text>
          <Text style={styles.text}><Text style={styles.label}>SĐT:</Text> {order.phone}</Text>
          <Text style={styles.text}><Text style={styles.label}>Địa chỉ:</Text> {order.address}</Text>
          <Text style={styles.text}><Text style={styles.label}>Ngày mua:</Text> {order.date}</Text>
          <Text style={styles.text}><Text style={styles.label}>Tổng tiền:</Text> {order.total}</Text>
          <Text style={styles.text}><Text style={styles.label}>Thanh toán:</Text> {order.payment}</Text>
          <Button title="Chi tiết" type="outline" buttonStyle={styles.button} />
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
  },
  button: {
    marginTop: 10,
  },
});
