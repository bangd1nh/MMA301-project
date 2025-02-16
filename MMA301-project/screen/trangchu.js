import React, { useState } from "react";
import {
    Image,
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
import { createDrawerNavigator } from "@react-navigation/drawer";

function Trangchu() {
    const [toogleSearch, setToggleSearch] = useState(false);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* search box */}
            <View
                style={{
                    position: "absolute",
                    width: 200,
                    zIndex: 1,
                    backgroundColor: "white",
                    transform: [{ translateX: "31%" }, { translateY: 53 }],
                    flexDirection: "row",
                    display: `${toogleSearch ? "flex" : "none"}`,
                }}
            >
                <TextInput
                    style={styles.textinput}
                    placeholder="search here"
                ></TextInput>
                {/* <AntDesign
                    name="search1"
                    size={40}
                    style={{ alignItems: "flex-end" }}
                /> */}
            </View>

            <View style={styles.somethingtop}>
                <Text style={{ color: "white" }}>Hotline: 0947199561</Text>
                <View style={{ flexDirection: "row", gap: 20 }}>
                    <TouchableOpacity>
                        <Text style={{ color: "white" }}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ color: "white" }}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.navbar}>
                <TouchableOpacity>
                    <Entypo name="menu" size={40}></Entypo>
                </TouchableOpacity>
                <Image
                    source={require("../assets/logo.jpg")}
                    style={{
                        height: 100,
                        width: 100,
                        marginLeft: 40,
                        display: `${toogleSearch ? "none" : "flex"}`,
                    }}
                />
                <View style={{ flexDirection: "row", gap: 20 }}>
                    <TouchableOpacity
                        onPress={() => {
                            setToggleSearch(!toogleSearch);
                        }}
                    >
                        <AntDesign name="search1" size={30}></AntDesign>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="shoppingcart" size={30}></AntDesign>
                    </TouchableOpacity>
                </View>
            </View>
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
                                <View style={{ flexDirection: "column" }}>
                                    <Image
                                        source={book.image}
                                        style={styles.bookslidesmall}
                                    />
                                    <Text style={styles.price}>
                                        {book.price}$
                                    </Text>
                                </View>
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
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btntext}>minh test</Text>
                </TouchableOpacity>
            </View>
            <Footer></Footer>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "auto",
        justifyContent: "space-between",
        marginTop: 50,
        flexDirection: "column",
    },
    navbar: {
        minHeight: 100,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexShrink: 1,
        paddingHorizontal: 10,
    },
    logo: {
        height: 100,
        width: 100,
        marginLeft: 40,
    },
    somethingtop: {
        maxHeight: 30,
        flexShrink: 1,
        backgroundColor: "#707070",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 20,
        alignItems: "center",
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
        width: 250,
        height: 35,
        fontSize: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
});

export default Trangchu;
