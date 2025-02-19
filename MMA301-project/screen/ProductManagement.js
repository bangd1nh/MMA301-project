import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import { Icon, Button, Avatar } from "react-native-elements";

const { width } = Dimensions.get("window");

export default function ProductManagement({ navigation }) {
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
    const [currentTime, setCurrentTime] = useState("");
    
    const products = [
        {
            id: 1,
            image: "https://tse3.mm.bing.net/th?id=OIP.MMi6SJ9ANgB0iSlkpnXFtQHaLX&pid=Api&P=0&h=220",
            isbn: "ISBN012345",
            category: "Self-Help",
            title: "Sapiens",
            author: "Yuval Noah Harari",
            price: "130,000 VND",
            quantity: "30",
        },
        {
            id: 2,
            image: "https://tse3.mm.bing.net/th?id=OIP.yCwJLkVcKL6LkOWDg8x7swHaLR&pid=Api&P=0&h=220",
            isbn: "ISBN0101010",
            category: "Horror",
            title: "Misery",
            author: "Stephen King",
            price: "119,000 VND",
            quantity: "24",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const dayNames = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
            const dayName = dayNames[now.getDay()];
            const date = now.getDate().toString().padStart(2, "0");
            const month = (now.getMonth() + 1).toString().padStart(2, "0");
            const year = now.getFullYear();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const seconds = now.getSeconds().toString().padStart(2, "0");
            setCurrentTime(`${dayName}, ${date}/${month}/${year} - ${hours}:${minutes}:${seconds}`);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Quản lý sản phẩm</Text>
                <Text style={styles.time}>{currentTime}</Text>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <View style={styles.info}>
                            <Text style={styles.productTitle}>{item.title}</Text>
                            <Text style={styles.text}>ISBN: {item.isbn}</Text>
                            <Text style={styles.text}>Category: {item.category}</Text>
                            <Text style={styles.text}>Author: {item.author}</Text>
                            <Text style={styles.text}>Price: {item.price}</Text>
                            <Text style={styles.text}>Quantity: {item.quantity}</Text>
                            <View style={styles.buttonContainer}>
                                <Button title="Sửa" buttonStyle={styles.smallButton} />
                                <Button title="Xóa" buttonStyle={[styles.smallButton, styles.deleteButton]} />
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: width * 0.04,
        backgroundColor: "#f0f0f0",
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: width * 0.03,
        borderRadius: 10,
        marginBottom: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    time: {
        fontSize: width * 0.035,
        color: "#666",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        flexDirection: "row",
        padding: width * 0.04,
        marginBottom: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    productImage: {
        width: 80,  // Makes the image take the full width of its container
        height: "80%", // Adjust height accordingly (or set a fixed height if needed)
        borderRadius: 10,
        marginRight: 10, // Remove margin if you want it to stretch fully
       
    },    
    info: {
        flex: 1,
    },
    productTitle: {
        fontSize: width * 0.045,
        fontWeight: "bold",
        color: "#333",
    },
    text: {
        fontSize: width * 0.035,
        color: "#666",
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 5,
    },
    smallButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: "red",
    },
});

