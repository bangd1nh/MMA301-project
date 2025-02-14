import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

function Card({ shoes }) {
    return (
        <>
            <View style={styles.cardholder}>
                {shoes.map((shoes, index) => (
                    <View key={index} style={styles.card}>
                        {shoes.tag && (
                            <View
                                style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    transform: [
                                        { translateY: 20 },
                                        { translateX: 5 },
                                    ],
                                    backgroundColor: `${
                                        shoes.tag === "NEW" ? "cyan" : "red"
                                    }`,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {shoes.tag}
                                </Text>
                            </View>
                        )}

                        <Image source={shoes.image} style={styles.bookimage} />
                        <Text>{shoes.name}</Text>
                        <Text style={styles.price}>{shoes.price}$</Text>
                    </View>
                ))}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    bookimage: {
        height: 150,
        width: "auto",
        objectFit: "cover",
    },
    card: {
        margin: 10,
        padding: 10,
        elevation: 1,
        width: "45%",
    },
    cardholder: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default Card;
