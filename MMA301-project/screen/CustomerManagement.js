import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions } from "react-native";
import { Card, Icon } from "react-native-elements";
import { Table, Row, Rows } from "react-native-table-component";

export default function CustomerManagement({ navigation }) {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const dayNames = [
                "Chủ Nhật",
                "Thứ Hai",
                "Thứ Ba",
                "Thứ Tư",
                "Thứ Năm",
                "Thứ Sáu",
                "Thứ Bảy",
            ];
            const dayName = dayNames[now.getDay()];
            const date = now.getDate().toString().padStart(2, "0");
            const month = (now.getMonth() + 1).toString().padStart(2, "0");
            const year = now.getFullYear();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const seconds = now.getSeconds().toString().padStart(2, "0");
            setCurrentTime(
                `${dayName}, ${date}/${month}/${year} - ${hours}:${minutes}:${seconds}`
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: "Quản lý khách hàng",
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

    const tableHead = ["ID khách hàng", "Tên khách hàng", "Email", "Admin"];
    const tableData = [
        ["1", "Kweeen", "john@example.com", "True"],
        ["2", "Jane Smith", "jane@example.com", "True"],
        ["3", "Alice Johnson", "alice@example.com", "False"],
        ["4", "Bob Brown", "bob@example.com", "False"],
        ["5", "Emma Wilson", "emma@example.com", "False"],
        // Thêm khách hàng khác tại đây
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Quản lý khách hàng</Text>
                <Text style={styles.time}>{currentTime}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Danh sách khách hàng</Text>
                <View style={styles.tableContainer}>
                    <Table
                        borderStyle={{ borderWidth: 1, borderColor: "#c8e1ff" }}
                    >
                        <Row
                            data={tableHead}
                            style={styles.head}
                            textStyle={[styles.headText]}
                        />
                        <Rows data={tableData} textStyle={[styles.text]} />
                    </Table>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#f0f0f0", // Màu nền xám
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff", // Màu nền trắng cho phần tiêu đề
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
    },
    time: {
        fontSize: 16,
        color: "#666",
    },
    section: {
        backgroundColor: "#fff", // Màu nền trắng cho phần bảng
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: "bold",
        color: "#444",
        textAlign: "center",
    },
    tableContainer: {
        marginTop: 20,
        borderRadius: 10,
        overflow: "hidden",
    },
    head: {
        height: 50,
        backgroundColor: "#f1f8ff",
    },
    headText: {
        margin: 6,
        textAlign: "center",
        fontSize: 14,
        color: "#333",
        fontWeight: "bold",
    },
    text: {
        margin: 6,
        textAlign: "center",
        fontSize: 14,
        color: "#333",
    },
});
