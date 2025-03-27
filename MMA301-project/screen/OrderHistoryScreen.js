import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { useCart } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const OrderHistoryScreen = () => {
  const { orderHistory } = useCart();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigation = useNavigation(); // Hook to access navigation

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() => setSelectedOrder(item)}
    >
      <View style={styles.orderInfo}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <Text style={styles.orderDate}>
          {new Date(item.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>
      <View style={styles.orderTotalContainer}>
        <Text style={styles.orderTotal}>
          {item.total.toLocaleString("en-US")} VND
        </Text>
        <Ionicons name="chevron-forward" size={20} color="#6B48FF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#6B48FF", "#00DDEB"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Order History</Text>
          <View style={styles.headerSpacer} />{" "}
          {/* Spacer to balance the layout */}
        </View>
      </LinearGradient>

      {orderHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#aaa" />
          <Text style={styles.emptyText}>No orders yet</Text>
        </View>
      ) : (
        <FlatList
          data={orderHistory}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Modal for Order Details */}
      <Modal
        visible={selectedOrder !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedOrder(null)}
      >
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={["#fff", "#F0F4FF"]}
            style={styles.modalContainer}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Order Details #{selectedOrder?.id}
              </Text>
              <TouchableOpacity onPress={() => setSelectedOrder(null)}>
                <Ionicons name="close-circle" size={28} color="#FF6F61" />
              </TouchableOpacity>
            </View>
            {selectedOrder && (
              <ScrollView style={styles.modalContent}>
                <View style={styles.detailSection}>
                  <Ionicons name="calendar-outline" size={20} color="#6B48FF" />
                  <Text style={styles.detailText}>
                    Order Date:{" "}
                    {new Date(selectedOrder.date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
                <View style={styles.detailSection}>
                  <Ionicons name="cash-outline" size={20} color="#6B48FF" />
                  <Text style={styles.detailText}>
                    Total: {selectedOrder.total.toLocaleString("en-US")} VND
                  </Text>
                </View>
                <View style={styles.detailSection}>
                  <Ionicons name="card-outline" size={20} color="#6B48FF" />
                  <Text style={styles.detailText}>
                    Payment Method: {selectedOrder.paymentMethod}
                  </Text>
                </View>
                <View style={styles.detailSection}>
                  <Ionicons name="location-outline" size={20} color="#6B48FF" />
                  <Text style={styles.detailText}>Shipping Information:</Text>
                </View>
                <Text style={styles.subDetailText}>
                  Name: {selectedOrder.shippingInfo.name}
                </Text>
                <Text style={styles.subDetailText}>
                  Email: {selectedOrder.shippingInfo.email}
                </Text>
                <Text style={styles.subDetailText}>
                  Phone: {selectedOrder.shippingInfo.phone}
                </Text>
                <Text style={styles.subDetailText}>
                  Address: {selectedOrder.shippingInfo.address},{" "}
                  {selectedOrder.shippingInfo.ward},{" "}
                  {selectedOrder.shippingInfo.district},{" "}
                  {selectedOrder.shippingInfo.city}
                </Text>
                {selectedOrder.shippingInfo.note && (
                  <Text style={styles.subDetailText}>
                    Note: {selectedOrder.shippingInfo.note}
                  </Text>
                )}
                <View style={styles.detailSection}>
                  <Ionicons name="cart-outline" size={20} color="#6B48FF" />
                  <Text style={styles.detailText}>Items:</Text>
                </View>
                {selectedOrder.items.map((item, index) => (
                  <View key={index} style={styles.itemDetail}>
                    <Text style={styles.subDetailText}>
                      - {item.name} (x{item.quantity}):{" "}
                      {(item.price * item.quantity).toLocaleString("en-US")} VND
                    </Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </LinearGradient>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F4FF" },
  header: {
    padding: 30,
    paddingTop: 50, // Extra padding for status bar
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  headerSpacer: { width: 28 }, // Spacer to balance the layout with the back button
  listContainer: { padding: 20 },
  orderItem: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderInfo: { flex: 1 },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6B48FF",
    marginBottom: 5,
  },
  orderDate: { fontSize: 14, color: "#888" },
  orderTotalContainer: { flexDirection: "row", alignItems: "center" },
  orderTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6F61",
    marginRight: 10,
  },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#aaa",
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    borderRadius: 20,
    padding: 20,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 15,
    marginBottom: 10,
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", color: "#6B48FF" },
  modalContent: { marginTop: 10 },
  detailSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 10,
    marginBottom: 5,
  },
  subDetailText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 30,
    marginBottom: 5,
  },
  itemDetail: { marginBottom: 5 },
});

export default OrderHistoryScreen;
