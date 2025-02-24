import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    Touchable,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Navbar from "../component/trangchu/navbar";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Link, useRoute } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import { shoes } from "../constant/data";
import { Picker } from "@react-native-picker/picker";
import Footer from "../component/trangchu/footer";

const Detail = () => {
    const [choice, setChoice] = useState(0);
    const route = useRoute();
    const { s } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Navbar />
            <View style={styles.navbar}>
                <Text>Home</Text>
                <AntDesign name="caretright" />
                <Text>{s.brand}</Text>
                <AntDesign name="caretright" />
                <Link>{s.name}</Link>
            </View>
            <View style={styles.slide}>
                <Swiper style={styles.swiper} index={choice} key={choice}>
                    {s.imgList.map((shoes, index) => {
                        return (
                            <View key={index}>
                                <Image
                                    source={shoes}
                                    style={styles.shoesslide}
                                />
                            </View>
                        );
                    })}
                </Swiper>
            </View>
            <View style={styles.slide}>
                <Swiper showsButtons={true} style={styles.swiper1}>
                    {s.imgList.map((book, index) => {
                        if (index % 3 === 0) {
                            return (
                                <View
                                    key={index}
                                    style={{ flexDirection: "row" }}
                                >
                                    <Pressable
                                        style={{ flexDirection: "column" }}
                                        onPress={() => {
                                            setChoice(index);
                                            console.log(index);
                                        }}
                                    >
                                        <Image
                                            source={book}
                                            style={styles.bookslidesmall}
                                        />
                                    </Pressable>
                                    {index + 1 < s.imgList.length && (
                                        <Pressable
                                            onPress={() => {
                                                setChoice(index + 1);
                                            }}
                                            style={{ flexDirection: "column" }}
                                        >
                                            <Image
                                                source={s.imgList[index + 1]}
                                                style={styles.bookslidesmall}
                                            />
                                        </Pressable>
                                    )}
                                    {index + 2 < s.imgList.length && (
                                        <Pressable
                                            onPress={() => {
                                                setChoice(index + 2);
                                            }}
                                            style={{ flexDirection: "column" }}
                                        >
                                            <Image
                                                source={s.imgList[index + 2]}
                                                style={styles.bookslidesmall}
                                            />
                                        </Pressable>
                                    )}
                                </View>
                            );
                        }
                    })}
                </Swiper>
            </View>
            <View style={styles.detail}>
                <Text style={{ fontSize: 30, marginBottom: 20 }}>{s.name}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text>Brand : </Text>
                    <Link>{s.brand}</Link>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text>Status : </Text>
                    <Text style={{ color: "#b3a93d", fontSize: 20 }}>
                        {s.status}
                    </Text>
                </View>
                <Text
                    style={{ fontWeight: "bold", color: "red", fontSize: 50 }}
                >
                    {s.price}$
                </Text>
                <Text style={{ fontStyle: "italic" }}>{s.description}</Text>
                <Text
                    style={{ textAlign: "center", marginTop: 20, fontSize: 30 }}
                >
                    Available size
                </Text>
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: "red",
                        borderRadius: 4,
                    }}
                >
                    <Picker style={{ width: "full" }}>
                        {s.size.map((size, index) => {
                            return (
                                <Picker.Item
                                    label={`${size}`}
                                    value={size}
                                    key={index}
                                />
                            );
                        })}
                    </Picker>
                </View>

                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        width: "auto",
                        marginVertical: "auto",
                        alignItems: "center",
                        borderRadius: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                    }}
                >
                    <Text>Add to cart</Text>
                </TouchableOpacity>
            </View>
            <Footer></Footer>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        marginTop: 50,
    },
    navbar: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#c2c2c2",
    },
    slide: {
        flexShrink: 1,
    },
    shoesslide: {
        height: 400,
        width: "auto",
    },
    swiper: {
        height: 400,
    },
    swiper1: {
        height: 120,
    },
    bookslidesmall: {
        height: 120,
        width: 120,
        margin: 10,
        objectFit: "cover",
    },
    detail: {
        padding: 20,
    },
});
export default Detail;
