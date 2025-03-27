import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Từ @expo/vector-icons
import { LinearGradient } from "expo-linear-gradient"; // Từ expo-linear-gradient
import { SafeAreaView } from "react-native-safe-area-context"; // Từ react-native-safe-area-context

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("card"); // Phương thức mặc định
  const [selectedCard, setSelectedCard] = useState(null); // Thẻ đã lưu được chọn
  const [selectedBank, setSelectedBank] = useState(null); // Ngân hàng được chọn

  const savedCards = [
    {
      id: 1,
      number: "4722XXXXXXXX8285",
      icon: "https://static.vecteezy.com/system/resources/previews/020/975/572/original/visa-logo-visa-icon-transparent-free-png.png",
    },
    {
      id: 2,
      number: "5305XXXXXXXX9895",
      icon: "https://pngimg.com/uploads/mastercard/mastercard_PNG23.png",
    },
  ];

  const banks = [
    {
      id: 1,
      icon: "https://tse4.mm.bing.net/th?id=OIP.EiyI8wEJNEhOx8BYEMtGNwHaE8&pid=Api&P=0&h=220",
    },
    {
      id: 2,
      icon: "https://tse4.mm.bing.net/th?id=OIP.r1fEE75vwals6IQhm1-tsgHaHa&pid=Api&P=0&h=220",
    },
    {
      id: 3,
      icon: "https://vignette.wikia.nocookie.net/logopedia/images/7/71/18c6bde735683a2380b183b39b06240a_Logo_moi.jpg/revision/latest?cb=20170209140933",
    },
    {
      id: 4,
      icon: "https://inkythuatso.com/uploads/images/2021/11/mb-bank-logo-inkythuatso-01-10-09-01-10.jpg",
    },
  ];

  const handleNext = () => {
    console.log({ cardNumber, expiry, cvv, selectedCard, selectedBank });
    navigation.navigate("Trangchu"); // Chuyển đến Trangchu
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        {/* Header với gradient */}
        <LinearGradient
          colors={["#6B48FF", "#00DDEB"]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.head}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>Select Payment</Text>
          </View>
        </LinearGradient>

        {/* Saved Cards Section */}
        <View style={styles.savedCards}>
          <Text style={styles.sectionTitle}>Saved Cards</Text>
          {savedCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.cardContainer,
                selectedCard === card.id && styles.cardContainerSelected,
              ]}
              onPress={() => setSelectedCard(card.id)}
            >
              <Image source={{ uri: card.icon }} style={styles.cardIcon} />
              <Text style={styles.cardText}>{card.number}</Text>
              {selectedCard === card.id && (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color="#00DDEB"
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Other Payment Methods */}
        <Text style={styles.sectionTitle}>Other Payment Methods</Text>

        {/* Debit/Credit Card */}
        <View style={styles.methodSection}>
          <TouchableOpacity
            style={styles.paymentMethod}
            onPress={() => setSelectedMethod("card")}
          >
            <Ionicons
              name="card"
              size={24}
              color={selectedMethod === "card" ? "#00DDEB" : "#888"}
            />
            <Text
              style={[
                styles.paymentMethodText,
                selectedMethod === "card" && styles.selectedText,
              ]}
            >
              Debit / Credit Card
            </Text>
          </TouchableOpacity>
          {selectedMethod === "card" && (
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Enter Card Details</Text>
              <TextInput
                style={styles.input}
                placeholder="Card Number"
                placeholderTextColor="#aaa"
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
              />
              <View style={styles.inputRow}>
                <TextInput
                  style={[styles.input, styles.inputHalf]}
                  placeholder="Expiry (MM/YY)"
                  placeholderTextColor="#aaa"
                  value={expiry}
                  onChangeText={setExpiry}
                  keyboardType="numeric"
                />
                <TextInput
                  style={[styles.input, styles.inputHalf]}
                  placeholder="CVV"
                  placeholderTextColor="#aaa"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                />
              </View>
            </View>
          )}
        </View>

        {/* Net Banking */}
        <View style={styles.methodSection}>
          <TouchableOpacity
            style={styles.paymentMethod}
            onPress={() => setSelectedMethod("banking")}
          >
            <Ionicons
              name="home"
              size={24}
              color={selectedMethod === "banking" ? "#00DDEB" : "#888"}
            />
            <Text
              style={[
                styles.paymentMethodText,
                selectedMethod === "banking" && styles.selectedText,
              ]}
            >
              Net Banking
            </Text>
          </TouchableOpacity>
          {selectedMethod === "banking" && (
            <View style={styles.bankContainer}>
              {banks.map((bank) => (
                <TouchableOpacity
                  key={bank.id}
                  style={[
                    styles.bankItem,
                    selectedBank === bank.id && styles.bankItemSelected,
                  ]}
                  onPress={() => setSelectedBank(bank.id)}
                >
                  <Image source={{ uri: bank.icon }} style={styles.bankIcon} />
                  {selectedBank === bank.id && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#00DDEB"
                      style={styles.bankCheckIcon}
                    />
                  )}
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.moreBanksButton}>
                <Text style={styles.moreBanksText}>More Banks</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Cash on Delivery */}
        <View style={styles.methodSection}>
          <TouchableOpacity
            style={styles.paymentMethod}
            onPress={() => setSelectedMethod("cash")}
          >
            <Ionicons
              name="cash"
              size={24}
              color={selectedMethod === "cash" ? "#00DDEB" : "#888"}
            />
            <Text
              style={[
                styles.paymentMethodText,
                selectedMethod === "cash" && styles.selectedText,
              ]}
            >
              Cash on Delivery
            </Text>
          </TouchableOpacity>
        </View>

        {/* Nút Next */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <LinearGradient
            colors={["#FF6F61", "#FF9F1C"]}
            style={styles.nextButtonGradient}
          >
            <Text style={styles.nextText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F0F4FF",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  savedCards: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6B48FF",
    marginBottom: 15,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardContainerSelected: {
    borderColor: "#00DDEB",
    backgroundColor: "#E6F7FF",
  },
  cardIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    flex: 1,
  },
  checkIcon: {
    marginLeft: 10,
  },
  methodSection: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  paymentMethodText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#888",
    fontWeight: "500",
  },
  selectedText: {
    color: "#00DDEB",
    fontWeight: "bold",
  },
  formContainer: {
    paddingTop: 10,
  },
  formTitle: {
    fontSize: 16,
    color: "#6B48FF",
    marginBottom: 10,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputHalf: {
    width: "48%",
  },
  bankContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  bankItem: {
    width: "45%",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  bankItemSelected: {
    borderColor: "#00DDEB",
    backgroundColor: "#E6F7FF",
  },
  bankIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  bankCheckIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  moreBanksButton: {
    padding: 10,
    backgroundColor: "#6B48FF",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  moreBanksText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  nextButton: {
    marginTop: 20,
    marginBottom: 30,
  },
  nextButtonGradient: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  nextText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PaymentScreen;
