import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

function Footer() {
    return (
        <ImageBackground
            style={styles.container}
            source={require("../../assets/backgroundFooter.jpg")}
            imageStyle={{ opacity: 0.2 }}
        >
            <Text></Text>
            <View style={styles.row}>
                <AntDesign name="home" size={30} color={"black"} />
                <Text style={styles.text}>Sneaker Shop</Text>
            </View>
            <View style={styles.row}>
                <AntDesign name="phone" size={30} color={"black"} />
                <Text style={styles.text}>Hotline: 0947199561</Text>
            </View>
            <View style={styles.row}>
                <AntDesign name="mail" size={30} color={"black"} />
                <Text style={styles.text}>Email: dinhbang121@gmail.com</Text>
            </View>
            <View style={styles.row}>
                <Feather name="globe" size={30} color={"black"} />
                <Text style={styles.text}>Website: localhost:8080/</Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        padding: 30,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        marginTop: 10,
    },
    text: {
        color: "black",
    },
});

export default Footer;
