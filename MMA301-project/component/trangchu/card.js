import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useCart } from "../../context/CartContext";
import { shoes } from "../../constant/data";

function Card({ onAddToCart }) {
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        if (onAddToCart) {
            onAddToCart(product);
        } else {
            addToCart(product);
            alert("Đã thêm vào giỏ hàng!");
        }
    };

    return (
        <View style={styles.cardholder}>
            {shoes.map((item, index) => {
                return (
                    <View key={index} style={styles.card}>
                        {item.tag && (
                            <View
                                style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    transform: [
                                        { translateY: 20 },
                                        { translateX: 5 },
                                    ],
                                    backgroundColor:
                                        item.tag === "NEW" ? "cyan" : "red",
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {item.tag}
                                </Text>
                            </View>
                        )}
                        <Image source={item.image} style={styles.bookimage} />
                        <Text>{item.name}</Text>
                        <Text style={styles.price}>{item.price}$</Text>

                        <TouchableOpacity
                            style={styles.addToCartButton}
                            onPress={() => handleAddToCart(item)}
                        >
                            <Text style={styles.addToCartText}>
                                Thêm vào giỏ
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    bookimage: {
        height: 150,
        width: 150,
        objectFit: "cover",
    },
    card: {
        margin: "2%",
        padding: 10,
        elevation: 1,
        width: "45%",
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
    },
    cardholder: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    addToCartButton: {
        backgroundColor: "black",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: "center",
        width: "100%",
    },
    addToCartText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    price: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Card;
