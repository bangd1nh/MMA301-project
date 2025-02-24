import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Navbar from "../component/trangchu/navbar";
import Footer from "../component/trangchu/footer";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const FeedBack = () => {
    const [selected, setSelected] = useState(null);
    return (
        <ScrollView style={styles.container}>
            <Navbar></Navbar>
            <View style={{ padding: 30 }}>
                <Text style={styles.title}>Your Exprerience</Text>
                <Text style={styles.link}>Get help ?</Text>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                    }}
                >
                    <Text style={{}}>Don't hold back. Good or bad -</Text>
                    <Text style={{ fontWeight: "bold" }}>
                        tell it like it is
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={{ fontWeight: 200, fontSize: 16 }}>
                        How likely are you to recommend to your friend?
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={styles.FontLight}>very unlikely</Text>
                        <Text style={styles.FontLight}>very unlikely</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: 20,
                        }}
                    >
                        {Array.from({ length: 10 }).map((_, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{ alignItems: "center" }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelected(index);
                                        }}
                                    >
                                        <Feather></Feather>
                                        <Feather
                                            name={
                                                index == selected
                                                    ? "check-circle"
                                                    : "circle"
                                            }
                                            size={15}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.FontLight}>
                                        {index + 1}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text
                        style={{
                            fontWeight: 200,
                            fontSize: 16,
                        }}
                    >
                        what would you tell your friend and family about?
                    </Text>
                    <TextInput
                        multiline={true}
                        style={styles.textInput}
                    ></TextInput>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                        Feed back
                    </Text>
                </TouchableOpacity>
            </View>
            <Footer></Footer>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    title: {
        fontSize: 40,
        fontFamily: "Cochin",
        fontWeight: "bold",
    },
    link: {
        textDecorationLine: "underline",
        fontSize: 25,
        fontWeight: 200,
    },
    card: {
        padding: 10,
        backgroundColor: "#bab8b8",
    },
    FontLight: {
        fontWeight: 200,
    },
    textInput: {
        height: 200,
        borderWidth: 1,
        borderColor: "#bab8b8",
        marginTop: 20,
    },
    btn: {
        backgroundColor: "rgba(89,89,89,0.7)",
        flexShrink: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center",
        marginTop: 30,
        flex: 0,
    },
});

export default FeedBack;
