import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Card, Icon } from "react-native-elements";

export default function CustomerManagement({ navigation }) {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const dayNames = [
                "Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"
            ];
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

    const customers = [
        { id: "1", name: "Kweeen", email: "john@gmail.com", isAdmin: true },
        { id: "2", name: "Jane Smith", email: "jane@gmail.com", isAdmin: true },
        { id: "3", name: "Alice Johnson", email: "alice@gmail.com", isAdmin: false },
        { id: "4", name: "Bob Brown", email: "bob@gmail.com", isAdmin: false },
        { id: "5", name: "Emma Wilson", email: "emm@gmail.com", isAdmin: false }
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Quản lý khách hàng</Text>
                <Text style={styles.time}>{currentTime}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Danh sách khách hàng</Text>
                {customers.map((customer) => (
                    <Card key={customer.id} containerStyle={styles.card}>
                        <Card.Title>{customer.name}</Card.Title>
                        <Card.Divider />
                        <Text style={styles.cardText}><Text style={styles.label}>Email:</Text> {customer.email}</Text>
                        <Text style={styles.cardText}><Text style={styles.label}>Admin:</Text> {customer.isAdmin ? "Yes" : "No"}</Text>
                    </Card>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#f0f0f0",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    time: {
        fontSize: 10,
        color: "#666",
    },
    section: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        color: "#444",
        textAlign: "center",
    },
    card: {
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 10,
    },
    cardText: {
        fontSize: 14,
        color: "#333",
    },
    label: {
        fontWeight: "bold",
    }
});
