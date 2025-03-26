import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
} from "react-native";
import React, { useState } from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
    const [toogleSearch, setToggleSearch] = useState(false);
    const navigation = useNavigation();
    const { getTotalItems } = useCart();

    return (
        <View>
            <View
                style={{
                    position: "absolute",
                    width: "45%",
                    zIndex: 1,
                    marginLeft: 10,
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
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Login");
                        }}
                    >
                        <Text style={{ color: "white" }}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("register");
                        }}
                    >
                        <Text style={{ color: "white" }}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.navbar}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.dispatch(DrawerActions.toggleDrawer())
                    }
                >
                    <Entypo name="menu" size={40}></Entypo>
                </TouchableOpacity>
                <Image
                    source={require("../../assets/logo.jpg")}
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
                    <TouchableOpacity
                        style={styles.cartContainer}
                        onPress={() =>
                            navigation.navigate("CartFlow", { screen: "Cart" })
                        }
                    >
                        <Image
                            source={require("../../assets/shopping-bag.png")}
                            style={styles.cartIcon}
                        />
                        {getTotalItems() > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    {getTotalItems()}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    textinput: {
        borderWidth: 2,
        width: "130%",
        height: 35,
        fontSize: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    cartContainer: {
        backgroundColor: "#E2E6E8",
        padding: 10,
        borderRadius: 30,
        position: "relative",
    },
    cartIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
    badge: {
        position: "absolute",
        top: -5,
        right: -5,
        backgroundColor: "black",
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
});

export default Navbar;
