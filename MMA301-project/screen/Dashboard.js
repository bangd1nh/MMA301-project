import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { Table, Row, Rows } from 'react-native-table-component';

export default function Dashboard({ navigation }) {
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
      title: '',
      headerLeft: () => (
        <Icon
          name="menu"
          size={30}
          onPress={() => navigation.toggleDrawer()}
          containerStyle={{ marginLeft: 15 }}
        />
      ),
    });
  }, [navigation]);

  const stats = [
    { title: 'Tổng Khách Hàng', value: '8 khách hàng', icon: 'users', type: 'feather', color: '#4CAF50' },
    { title: 'Tổng Sản Phẩm', value: '42 sản phẩm', icon: 'box', type: 'feather', color: '#2196F3' },
    { title: 'Tổng Đơn Hàng', value: '24 đơn hàng', icon: 'shopping-cart', type: 'feather', color: '#FF9800' },
    { title: 'Sắp Hết Hàng', value: '11 sản phẩm', icon: 'alert-triangle', type: 'feather', color: '#F44336' },
  ];

  const tableHead = ['ID', 'Khách hàng', 'Số điện thoại', 'Địa chỉ', 'Ngày mua', 'Tổng tiền', 'Thanh Toán', 'Chức năng'];
  const tableData = [
    ['25', 'Kweeen', '(+84)796510005', 'Hoa Hai', '2024-03-18', '7,036,863 VND', 'COD', <Icon name="eye" type="feather" />],
    // Thêm đơn hàng khác tại đây
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bảng Điều Khiển</Text>
        <Text style={styles.time}>{currentTime}</Text>
      </View>
      <View style={styles.statsContainer}>
        {stats.map((item, index) => (
          <Card key={index} containerStyle={[styles.card, { borderColor: item.color }]}>
            <Icon name={item.icon} type={item.type} size={40} color={item.color} />
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={[styles.statTitle, { color: item.color }]}>{item.title}</Text>
          </Card>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Đơn Hàng Hôm Nay</Text>
        <View style={styles.tableContainer}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
            <Rows data={tableData} textStyle={styles.text} />
          </Table>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0', // Màu nền xám
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff', // Màu nền trắng cho phần tiêu đề
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Canh giữa các ô số liệu tổng
    marginBottom: 20,
  },
  card: {
    width: Dimensions.get('window').width / 2.2, // Điều chỉnh kích thước các ô số liệu tổng để vừa trên màn hình
    alignItems: 'center',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff', // Màu nền trắng cho các ô số liệu tổng
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  statTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff', // Màu nền trắng cho phần đơn hàng hôm nay
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
  },
  tableContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  head: {
    height: 50,
    backgroundColor: '#f1f8ff',
  },
  headText: {
    margin: 6,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  text: {
    margin: 6,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
});


