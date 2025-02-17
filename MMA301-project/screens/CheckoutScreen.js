import React, { useState } from "react";
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const { cart, getTotalItems, clearCart } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);
  const [form, setForm] = useState({ email: "", name: "", phone: "", address: "", city: "", district: "", ward: "", note: "" });
  const [errors, setErrors] = useState({});

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!form.name) newErrors.name = "Vui lòng nhập họ tên";
    if (!form.phone) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!form.address) newErrors.address = "Vui lòng nhập địa chỉ";
    if (!form.city) newErrors.city = "Bạn chưa nhập tỉnh thành";
    if (!form.district) newErrors.district = "Bạn chưa nhập quận huyện";
    if (!form.ward) newErrors.ward = "Bạn chưa nhập phường xã";
    if (!form.paymentMethod) newErrors.paymentMethod = "Vui lòng chọn phương thức thanh toán";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOrder = () => {
    if (validateForm()) {
      if (form.paymentMethod === "cod") {
        Alert.alert("Bạn đã chọn thanh toán trực tiếp", "Đặt hàng thành công.", [{ text: "OK", onPress: () => {
          clearCart();
          navigation.navigate("Home");
        }}]);
      } else if (form.paymentMethod === "online") {
        Alert.alert("Bạn đã chọn hình thức thanh toán online", "Vui lòng thực hiện thanh toán qua cổng thanh toán.", [{ text: "OK", onPress: () => {
          clearCart();
          navigation.navigate("Home");
        }}]);
      } else {
        Alert.alert("Thành công", "Đơn hàng đã được xác nhận!", [{ text: "OK", onPress: () => {
          clearCart();
          navigation.navigate("Home");
        }}]);
      }
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.backButton}>🏠 Trang chủ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <TouchableOpacity style={styles.orderSummary} onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.orderText}>Đơn hàng ({getTotalItems()} sản phẩm) {isExpanded ? "▼" : "▲"}</Text>
        <Text style={styles.totalAmount}>{totalAmount.toLocaleString()}đ</Text>
      </TouchableOpacity>

      {isExpanded && (
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.quantityBadge}>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                </View>
              </View>
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <Text style={styles.price}>{(item.price * item.quantity).toLocaleString()}đ</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      )}


      <Text style={styles.sectionHeader}>📋 Thông tin nhận hàng</Text>
      {Object.entries(form).map(([key, value]) => (
        key !== "note" && key !== "paymentMethod" && (
          <View key={key} style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors[key] && styles.inputError]}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={value}
              onChangeText={(text) => setForm({ ...form, [key]: text })}
            />
            {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
          </View>
        )
      ))}
      <TextInput style={styles.input} placeholder="Ghi chú (tùy chọn)" onChangeText={(text) => setForm({ ...form, note: text })} />

      {/* Phương thức thanh toán */}
      <Text style={styles.sectionHeader}>💳 Hình thức thanh toán</Text>
      {errors.paymentMethod && <Text style={styles.errorText}>{errors.paymentMethod}</Text>}
      <TouchableOpacity 
        style={[styles.paymentOption, form.paymentMethod === "online" && styles.paymentSelected]}
        onPress={() => setForm({ ...form, paymentMethod: "online" })}>
        <Text>Thanh toán online </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.paymentOption, form.paymentMethod === "cod" && styles.paymentSelected]}
        onPress={() => setForm({ ...form, paymentMethod: "cod" })}>
        <Text>Thanh toán trực tiếp</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
        <Text style={styles.confirmText}>Đặt hàng</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        <Text style={styles.backToCart}>◄ Quay về giỏ hàng</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { marginBottom: 15 },
  backButton: { fontSize: 18, fontWeight: "bold" },
  orderSummary: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderColor: "#ddd", marginBottom: 10 },
  orderText: { fontSize: 18, fontWeight: "bold" },
  totalAmount: { fontSize: 18, fontWeight: "bold", color: "red" },
  inputContainer: { marginBottom: 10, marginTop: 5},
  input: { backgroundColor: "#f5f5f5", padding: 10, borderRadius: 5, fontSize: 16 },
  inputError: { borderColor: "red", borderWidth: 1 },
  errorText: { color: "red", fontSize: 14, marginTop: 5 },
  confirmButton: { backgroundColor: "#000", padding: 12, borderRadius: 5, alignItems: "center", marginTop: 20 },
  confirmText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  sectionHeader: { fontSize: 20, fontWeight: "bold", marginTop: 15, marginBottom: 5 },
  paymentOption: { flexDirection: "row", padding: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 5, marginTop: 10 },
  paymentSelected: { borderColor: "blue", backgroundColor: "#e0f0ff" },
  productImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 5,
    marginRight: 10,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  details: {
    flex: 1,
  },
  price: {
    fontWeight: "bold",
  },
  imageContainer: {
    position: "relative",
  },
  quantityBadge: {
    position: "absolute",
    top: -5,
    left: 40,
    backgroundColor: "#333333",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  quantityText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 5,
  },
  backToCart: {
    marginTop: 10,
    textAlign: "center",
    color: "#007bff",
    fontSize: 16,
  },
});

export default CheckoutScreen;
