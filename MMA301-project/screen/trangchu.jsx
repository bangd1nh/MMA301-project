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
    Modal,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { shoes } from "../constant/data";
import Card from "../component/trangchu/card";
import Footer from "../component/trangchu/footer";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import Navbar from "../component/trangchu/navbar";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext"; // Quản lý giỏ hàng

const Trangchu = () => {
    const navigate = useNavigation();
    const handlePress = (shoes) => {
        navigate.navigate("Detail", { s: shoes });
    };
    const { addToCart, getTotalItems } = useCart();

    const [modalVisible, setModalVisible] = useState(false);
    const [addedProduct, setAddedProduct] = useState(null);

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedProduct(product);
        setModalVisible(true);
    };

    const handleCheckout = () => {
        setModalVisible(false);
        navigate.navigate("CartFlow", { screen: "Checkout" });
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

            <Card shoes={shoes} onAddToCart={handleAddToCart} />

            <View style={styles.title}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btntext}>Xem Tất cả</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.title}>
                <Text style={styles.titleText}>Tất cả sản phẩm</Text>
                <Text style={styles.titleText}>_________</Text>
            </View>
            <Card shoes={shoes} onAddToCart={handleAddToCart} />

            <View style={styles.title}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btntext}>Xem Tất cả</Text>
                </TouchableOpacity>
            </View>
            <Footer></Footer>
            {/* Modal thông báo "Mua hàng thành công" */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalContent}>
                        <Text style={modalStyles.modalHeader}>
                            ✅ Thêm vào giỏ hàng thành công
                        </Text>
                        {addedProduct && (
                            <View style={modalStyles.modalItem}>
                                <Image
                                    source={addedProduct.image}
                                    style={modalStyles.modalImage}
                                />
                                <View>
                                    <Text style={modalStyles.modalName}>
                                        {addedProduct.name}
                                    </Text>
                                    <Text style={modalStyles.modalPrice}>
                                        {addedProduct.price.toLocaleString()}đ
                                    </Text>
                                </View>
                            </View>
                        )}
                        <Text style={modalStyles.cartInfo}>
                            Giỏ hàng của bạn hiện có {getTotalItems()} sản phẩm
                        </Text>
                        <TouchableOpacity
                            style={modalStyles.continueButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={modalStyles.continueText}>
                                Tiếp tục mua hàng
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={modalStyles.checkoutButton}
                            onPress={handleCheckout}
                        >
                            <Text style={modalStyles.checkoutText}>
                                Thanh toán ngay
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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

const modalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#28a745",
        marginBottom: 10,
    },
    modalItem: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        backgroundColor: "#f8f8f8",
        padding: 10,
        borderRadius: 5,
        width: "100%",
    },
    modalImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    modalName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    modalPrice: {
        fontSize: 14,
        color: "#555",
    },
    cartInfo: {
        marginVertical: 10,
        fontSize: 14,
    },
    continueButton: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
    },
    continueText: {
        color: "#fff",
        fontWeight: "bold",
    },
    checkoutButton: {
        backgroundColor: "black",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    checkoutText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default Trangchu;
