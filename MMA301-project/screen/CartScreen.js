import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";

const CartScreen = () => {
  const navigation = useNavigation();
  const { cart, removeFromCart, updateQuantity, getTotalItems } = useCart();

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      {/* Hình sản phẩm */}
      <Image source={{ uri: item.image }} style={styles.image} />
      
      {/* Thông tin sản phẩm */}
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityNumber}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Phần bên phải: chữ Xóa ở trên và giá tiền bên dưới */}
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Text style={styles.removeButton}>Xóa</Text>
        </TouchableOpacity>
        <Text style={styles.price}>{(item.price * item.quantity).toLocaleString()}đ</Text>
      </View>
    </View>
  );

  const handleCheckout = () => {
    navigation.navigate("Checkout");
  };

  return (
    <View style={styles.container}>
      {/* Header dạng breadcrumb + icon giỏ hàng cùng một hàng */}
      <View style={styles.breadcrumbContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.breadcrumbLink}>Trang chủ</Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumbSeparator}> &gt; </Text>
          <Text style={styles.breadcrumbCurrent}>Giỏ hàng</Text>
        </View>

        <TouchableOpacity style={styles.cartContainer} onPress={() => navigation.navigate("Cart")}>
        <Image source={require("../assets/shopping-bag.png")} style={styles.cartIcon} />
          {getTotalItems() > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{getTotalItems()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Đường kẻ ngang */}
      <View style={styles.horizontalLine} />

      {/* Tiêu đề */}
      <Text style={styles.headerText}>Giỏ hàng của bạn</Text>

      {/* Danh sách sản phẩm */}
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Giỏ hàng trống</Text>
      ) : (
        <FlatList data={cart} renderItem={renderItem} keyExtractor={(item) => item.id} />
      )}

      {/* Footer */}
      {cart.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.summaryContainer}>
            <Text style={styles.totalText}>Tổng tiền:</Text>
            <Text style={styles.totalAmount}>
              {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}đ
            </Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  /* Breadcrumb */
  breadcrumbContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  breadcrumbLink: {
    fontSize: 16,
    fontWeight: "bold",
  },
  breadcrumbSeparator: {
    marginHorizontal: 5,
    fontSize: 16,
    color: "#000",
  },
  breadcrumbCurrent: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "bold",
  },

  /* Icon giỏ hàng */
  cartContainer: {
    backgroundColor: "#E2E6E8",
    padding: 10,
    borderRadius: 30,
    flexDirection: "row",
    position: "relative",
  },
  cartIcon: {
    width: 24, // Điều chỉnh kích thước phù hợp
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

  /* Đường kẻ ngang */
  horizontalLine: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },

  /* Tiêu đề */
  headerText: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  emptyText: { textAlign: "center", fontSize: 16, color: "#aaa" },

  /* Item giỏ hàng */
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  image: { width: 70, height: 70, resizeMode: "contain", marginRight: 10 },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold" },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    width: 90,
    justifyContent: "space-between",
    marginTop: 5,
  },
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#ddd",
    borderRadius: 3,
  },
  quantityText: { fontSize: 18, fontWeight: "bold" },
  quantityNumber: { fontSize: 16, fontWeight: "bold" },

  /* Container bên phải cho Xóa và giá tiền */
  rightContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: 10,
  },
  removeButton: { fontSize: 14, color: "red", marginBottom: 5 },
  price: { fontSize: 16, fontWeight: "bold", color: "red" },

  /* Footer */
  footer: { marginTop: 15 },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginTop: 10,
  },
  totalText: { fontSize: 18, fontWeight: "bold" },
  totalAmount: { fontSize: 18, fontWeight: "bold", color: "red" },
  checkoutButton: {
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default CartScreen;
