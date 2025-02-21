import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

const PaymentScreen = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = () => {
    console.log({
      cardNumber,
      expiry,
      cvv,
      isSaved,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.head}>
        <Ionicons
          name="arrow-back"
          size={30}
          color="black"
          style={styles.backIcon}
        />
        <Text style={styles.title}>Select Payment</Text>
      </View>

      {/* Saved Cards Section */}
      <View style={styles.savedCards}>
        <Text style={styles.savedCardTitle}>Saved Cards</Text>
        <View style={styles.cardContainer}>
          <Image
            style={styles.cardIcon}
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/020/975/572/original/visa-logo-visa-icon-transparent-free-png.png",
            }}
          ></Image>
          <Text style={styles.cardText}> 4722XXXXXXXX8285</Text>
        </View>
        <View style={styles.cardContainer}>
          <Image
            style={styles.cardIcon}
            source={{
              uri: "https://pngimg.com/uploads/mastercard/mastercard_PNG23.png",
            }}
          ></Image>
          <Text style={styles.cardText}>5305XXXXXXXX9895</Text>
        </View>
      </View>

      {/* Other Payment Methods */}

      <Text style={styles.paymentMethodsTitle}>Other Payment Methods</Text>
      <View style={styles.debit}>
        <TouchableOpacity style={styles.paymentMethod}>
          <Ionicons name="card" size={24} color="#1abc9c" />
          <Text style={styles.paymentMethodText}>Debit / Credit Card</Text>
        </TouchableOpacity>
        <Text style={styles.formTitle}>Enter Card Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="Expiry (MM/YY)"
            value={expiry}
            onChangeText={setExpiry}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="CVV"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.banking}>
        <TouchableOpacity style={styles.bankingMethod}>
          <Ionicons name="home" size={24} color="#1abc9c" />
          <Text style={styles.bankingMethodText}>Net Banking</Text>
        </TouchableOpacity>
        <View style={styles.bankContainer}>
          <Image
            source={{
              uri: "https://tse4.mm.bing.net/th?id=OIP.EiyI8wEJNEhOx8BYEMtGNwHaE8&pid=Api&P=0&h=220",
            }}
            style={styles.bankIcon}
          />

          <Image
            source={{
              uri: "https://tse4.mm.bing.net/th?id=OIP.r1fEE75vwals6IQhm1-tsgHaHa&pid=Api&P=0&h=220",
            }}
            style={styles.bankIcon}
          />

          <Image
            source={{
              uri: "https://vignette.wikia.nocookie.net/logopedia/images/7/71/18c6bde735683a2380b183b39b06240a_Logo_moi.jpg/revision/latest?cb=20170209140933",
            }}
            style={styles.bankIcon}
          />

          <Image
            source={{
              uri: "https://inkythuatso.com/uploads/images/2021/11/mb-bank-logo-inkythuatso-01-10-09-01-10.jpg",
            }}
            style={styles.bankIcon}
          />
        </View>
        <TouchableOpacity style={styles.moreBanksButton}>
          <Text style={styles.moreBanksText}>More Banks</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.delivery}>
        <TouchableOpacity style={styles.paymentMethod}>
          <Ionicons name="cash" size={24} color="#1abc9c" />
          <Text style={styles.deliveryMethodText}>Cash on Delivery</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor: "#fff",
  },
  cash: { color: "#1abc9c" },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 20,
    backgroundColor: "#fff",
  },
  backIcon: {
    marginRight: 10,
    color: "#1abc9c",
  },
  cardIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  debit: {
    flex: 1,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1abc9c",
  },
  savedCards: {
    marginBottom: 30,
  },
  savedCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    height: "40",
    flexDirection: "row",
    justifyContent: "between",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(95, 92, 92, 0.3)",
  },
  cardText: {
    fontSize: 16,
    marginLeft: 34,
  },
  paymentMethodsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  paymentMethodText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#1abc9c",
  },
  formTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputHalf: {
    width: "48%",
  },
  banking: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  bankingMethod: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  bankingMethodText: { fontSize: 18, marginLeft: 10, color: "#1abc9c" },
  bankContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  bankIcon: {
    width: 40,
    height: 40,
  },
  moreBanksButton: {
    padding: 10,
    backgroundColor: "#1abc9c",
    borderRadius: 5,
    alignItems: "center",
  },
  moreBanksText: {
    fontSize: 16,
    color: "#fff",
  },
  delivery: { flex: 1, padding: 20, backgroundColor: "#fff" },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "between",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#1abc9c",
    marginBottom: 20,
  },
  deliveryMethodText: { fontSize: 16, marginLeft: 10, color: "#1abc9c" },
  nextButton: {
    padding: 15,
    backgroundColor: "#1abc9c",
    borderRadius: 5,
    alignItems: "center",
  },
  nextText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default PaymentScreen;
