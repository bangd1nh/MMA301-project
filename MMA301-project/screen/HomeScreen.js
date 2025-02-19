import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";

const products = [
  { id: "1", name: "Nike Air Max", price: 120000, image: "https://i.imgur.com/q5o3P4V.png" },
  { id: "2", name: "Adidas Ultraboost", price: 140000, image: "https://i.imgur.com/fKpL89O.png" },
  { id: "3", name: "Puma Running", price: 110000, image: "https://i.imgur.com/vt6NRE6.png" },
];

const HomeScreen = () => {
  const navigation = useNavigation();
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
    navigation.navigate("Checkout");
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price.toLocaleString()}đ</Text>
      <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
        <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Nút giỏ hàng với Badge */}
      <TouchableOpacity style={styles.cartContainer} onPress={() => navigation.navigate("Cart")}>
        <Image source={require("../assets/shopping-bag.png")} style={styles.cartIcon} />
        {getTotalItems() > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{getTotalItems()}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Danh sách sản phẩm */}
      <FlatList data={products} renderItem={renderItem} keyExtractor={(item) => item.id} numColumns={2} />

      {/* Modal thông báo */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>✅ Mua hàng thành công</Text>
            {addedProduct && (
              <View style={styles.modalItem}>
                <Image source={{ uri: addedProduct.image }} style={styles.modalImage} />
                <View>
                  <Text style={styles.modalName}>{addedProduct.name}</Text>
                  <Text style={styles.modalPrice}>{addedProduct.price.toLocaleString()}đ</Text>
                </View>
              </View>
            )}
            <Text style={styles.cartInfo}>Giỏ hàng của bạn hiện có {getTotalItems()} sản phẩm</Text>
            <TouchableOpacity style={styles.continueButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.continueText}>Tiếp tục mua hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutText}>Thanh toán ngay</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f8f8f8" },

  // Giỏ hàng + Badge
  cartContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#E2E6E8",
    padding: 10,
    borderRadius: 30,
    zIndex: 10,
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
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },

  card: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: 100, height: 100, resizeMode: "contain" },
  name: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  price: { fontSize: 14, color: "#888", marginVertical: 5 },
  addToCartButton: { backgroundColor: "black", padding: 8, borderRadius: 5 },
  addToCartText: { color: "#fff", fontWeight: "bold" },

  // Modal styles
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
  modalImage: { width: 50, height: 50, marginRight: 10 },
  modalName: { fontSize: 16, fontWeight: "bold" },
  modalPrice: { fontSize: 14, color: "#555" },
  cartInfo: { marginVertical: 10, fontSize: 14 },
  continueButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  continueText: { color: "#fff", fontWeight: "bold" },
  checkoutButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontWeight: "bold" },
});

export default HomeScreen;
