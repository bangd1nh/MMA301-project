import React, { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    Touchable,
    TouchableOpacity,
    View,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { shoes } from "../constant/data";
import Card from "../component/trangchu/card";
import Footer from "../component/trangchu/footer";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import Navbar from "../component/trangchu/navbar";
import { useNavigation } from "@react-navigation/native";

const Trangchu = () => {
    const navigate = useNavigation();
    const handlePress = (shoes) => {
        navigate.navigate("Detail", { s: shoes });
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* search box */}
            <Navbar></Navbar>
            <View style={styles.slide}>
                <Swiper showsButtons={true} style={styles.swiper}>
                    {shoes.map((book, index) => {
                        return (
                            <View key={index}>
                                <Image
                                    source={book.image}
                                    style={styles.bookslide}
                                />
                            </View>
                        );
                    })}
                </Swiper>
            </View>
            <View style={styles.title}>
                <Text style={{ fontWeight: "bold" }}>Sản phẩm mới nhất</Text>
                <Text style={{ fontWeight: "bold" }}>___________</Text>
            </View>
            <View style={styles.slide}>
                <Swiper showsButtons={false} style={styles.swiper1}>
                    {shoes.map((book, index) => {
                        return (
                            <View key={index} style={{ flexDirection: "row" }}>
                                <Pressable
                                    onPress={() => {
                                        console.log(book);
                                        handlePress(book);
                                    }}
                                    style={{ flexDirection: "column" }}
                                >
                                    <Image
                                        source={book.image}
                                        style={styles.bookslidesmall}
                                    />
                                    <Text style={styles.price}>
                                        {book.price}$
                                    </Text>
                                </Pressable>
                                {index + 1 < shoes.length && (
                                    <View style={{ flexDirection: "column" }}>
                                        <Image
                                            source={shoes[index + 1].image}
                                            style={styles.bookslidesmall}
                                        />
                                        <Text style={styles.price}>
                                            {shoes[index + 1].price}$
                                        </Text>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </Swiper>
            </View>
            <View style={styles.title}>
                <Text style={styles.titleText}>Sản phẩm nổi bật</Text>
                <Text style={styles.titleText}>________</Text>
            </View>
            <Card shoes={shoes}></Card>

            <View style={styles.title}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btntext}>Xem Tất cả</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.title}>
                <Text style={styles.titleText}>Tất cả sản phẩm</Text>
                <Text style={styles.titleText}>_________</Text>
            </View>
            <Card shoes={shoes}></Card>
            <View style={styles.title}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btntext}>Xem Tất cả</Text>
                </TouchableOpacity>
            </View>
            <Footer></Footer>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        height: "auto",
        justifyContent: "space-between",
        marginTop: 50,
        flexDirection: "column",
        backgroundColor: "white",
    },
    bookslide: {
        height: 300,
        width: "auto",
        objectFit: "cover",
    },
    bookslidesmall: {
        height: 200,
        width: 200,
        objectFit: "cover",
    },
    slide: {
        flexShrink: 1,
    },
    swiper: {
        height: 300,
    },
    swiper1: {
        height: 200,
    },
    price: {
        color: "red",
        fontSize: 20,
    },
    title: {
        flexShrink: 1,
        alignItems: "center",
        marginVertical: 20,
    },

    btn: {
        backgroundColor: "#474747",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
    },
    btntext: {
        color: "white",
        fontSize: 20,
    },
    titleText: {
        fontFamily: "Cochin",
        fontSize: 30,
    },
    textinput: {
        borderWidth: 2,
        width: "130%",
        height: 35,
        fontSize: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
});

export default Trangchu;
