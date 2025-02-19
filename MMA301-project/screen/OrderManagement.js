import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Icon, Button } from 'react-native-elements';

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
      title: 'Quản lý đơn hàng',
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

  const tableHead = ['ID', 'Khách hàng', 'Số điện thoại', 'Địa chỉ', 'Ngày mua', 'Tổng tiền', 'Thanh Toán', 'Chức năng'];
  const tableData = [
    ['25', 'Kweeen', '(+84)796510005', 'Hoa Hai', '2024-03-18', '7,036,863 VND', 'COD', <Button title="Chi tiết" type="outline" />],
    ['26', 'Jane Doe', '(+84)796510999', 'Hoa Hai', '2024-03-19', '3,236,789 VND', 'Credit Card', <Button title="Chi tiết" type="outline" />],
    // Thêm đơn hàng khác tại đây
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quản lý đơn hàng</Text>
        <Text style={styles.time}>{currentTime}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Danh sách đơn hàng</Text>
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
  section: {
    backgroundColor: '#fff', // Màu nền trắng cho phần bảng
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
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


