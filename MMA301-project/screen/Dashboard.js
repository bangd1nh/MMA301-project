import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions } from "react-native";
import { Card, Icon } from "react-native-elements";

export default function Dashboard({ navigation }) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const dayNames = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
      const formattedTime = `${dayNames[now.getDay()]}, ${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()} - ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
      setCurrentTime(formattedTime);
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

  const stats = [
    { title: "Tổng KH", value: "8", icon: "users", type: "feather", color: "#4CAF50" },
    { title: "Tổng SP", value: "42", icon: "box", type: "feather", color: "#2196F3" },
    { title: "Tổng ĐH", value: "24", icon: "shopping-cart", type: "feather", color: "#FF9800" },
    { title: "Sắp Hết", value: "11", icon: "alert-triangle", type: "feather", color: "#F44336" },
  ];

  const orders = [
    { id: "25", customer: "Minh", phone: "0796510005", address: "Hoa Hai", date: "18/03/2004", total: "7,036k", status: "COD" },
    { id: "26", customer: "Thanh", phone: "0796123456", address: "Hai Chau", date: "19/03/2004", total: "5,200k", status: "Paid" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "COD":
        return "#FF9800";
      case "Paid":
        return "#4CAF50";
      default:
        return "#607D8B";
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bảng Điều Khiển</Text>
        <Text style={styles.time}>{currentTime}</Text>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((item, index) => (
          <Card key={index} containerStyle={[styles.card, { borderColor: item.color }]}>
            <Icon name={item.icon} type={item.type} size={28} color={item.color} containerStyle={styles.iconCenter} />
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={[styles.statTitle, { color: item.color }]}>{item.title}</Text>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Đơn Hàng Hôm Nay</Text>
        {orders.map((order, index) => (
          <Card key={index} containerStyle={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>#{order.id}</Text>
              <Text style={[styles.orderStatus, { color: getStatusColor(order.status) }]}>{order.status}</Text>
            </View>
            <Text style={styles.orderText}><Text style={styles.label}>KH: </Text>{order.customer}</Text>
            <Text style={styles.orderText}><Text style={styles.label}>SĐT: </Text>{order.phone}</Text>
            <Text style={styles.orderText}><Text style={styles.label}>Địa Chỉ: </Text>{order.address}</Text>
            <Text style={styles.orderText}><Text style={styles.label}>Ngày: </Text>{order.date}</Text>
            <Text style={styles.orderTotal}><Text style={styles.label}>Tổng: </Text>{order.total}</Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: "#f0f0f0" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 12,
  },

  title: { fontSize: 16, fontWeight: "bold", color: "#333" },
  time: { fontSize: 10, color: "#666" },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#fff",
    width: Dimensions.get("window").width / 2.3 - 16,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  iconCenter: { alignSelf: "center", marginBottom: 8 },

  statValue: { fontSize: 20, fontWeight: "bold", color: "#000", textAlign: "center", alignSelf: "center" },

  statTitle: { fontSize: 14, textAlign: "center" },

  section: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  sectionTitle: { fontSize: 18, marginBottom: 8, fontWeight: "bold", color: "#444", textAlign: "center" },

  orderCard: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  orderHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },

  orderId: { fontSize: 16, fontWeight: "bold", color: "#000" },

  orderStatus: { fontSize: 14, fontWeight: "bold" },

  orderText: { fontSize: 14, color: "#333" },

  orderTotal: { fontSize: 16, fontWeight: "bold", color: "#000", marginTop: 4 },

  label: { fontWeight: "bold", color: "#555" },
});
