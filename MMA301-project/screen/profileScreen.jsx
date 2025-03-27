import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // Thêm gradient
import { getUserById } from "../data/userData";

const userProfile = getUserById(1);

const ProfileScreen = () => {
  const [profile, setProfile] = useState(userProfile);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...userProfile });
  const navigation = useNavigation();

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User data is missing!</Text>
      </View>
    );
  }

  const handleSave = () => {
    setProfile(editedProfile);
    setIsModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header với gradient */}
      <LinearGradient
        colors={["#6B48FF", "#00DDEB"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.topHeader}>
          <Text style={styles.profileText}>Profile</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.botHeader}>
          <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
          <Text style={styles.name}>{profile.name}</Text>
          <TouchableOpacity
            style={styles.editProfile}
            onPress={() => setIsModalVisible(true)}
          >
            <LinearGradient
              colors={["#FF6F61", "#FF9F1C"]}
              style={styles.editButtonGradient}
            >
              <Text style={styles.textEdit}>Edit Profile</Text>
              <Ionicons name="pencil-outline" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Thông tin profile */}
      <View style={styles.infoContainer}>
        <InfoItem icon="mail" label="Email" value={profile.email} />
        <InfoItem icon="call" label="Mobile" value={profile.phone} />
        <InfoItem icon="logo-twitter" label="Twitter" value={profile.twitter} />
        <InfoItem icon="location" label="Address" value={profile.address} />
        <InfoItem
          icon="logo-facebook"
          label="Facebook"
          value={profile.facebook}
        />
      </View>

      {/* Modal chỉnh sửa */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={["#fff", "#F0F4FF"]}
            style={styles.modalContainer}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Your Profile</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close-circle" size={30} color="#FF6F61" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.name}
                onChangeText={(text) =>
                  setEditedProfile({ ...editedProfile, name: text })
                }
              />
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.email}
                onChangeText={(text) =>
                  setEditedProfile({ ...editedProfile, email: text })
                }
              />
              <Text style={styles.label}>Mobile</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.phone}
                onChangeText={(text) =>
                  setEditedProfile({ ...editedProfile, phone: text })
                }
              />
              <Text style={styles.label}>Twitter</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.twitter}
                onChangeText={(text) =>
                  setEditedProfile({ ...editedProfile, twitter: text })
                }
              />
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.address}
                onChangeText={(text) =>
                  setEditedProfile({ ...editedProfile, address: text })
                }
              />
              <Text style={styles.label}>Facebook</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.facebook}
                onChangeText={(text) =>
                  setEditedProfile({ ...editedProfile, facebook: text })
                }
              />
            </ScrollView>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <LinearGradient
                colors={["#00DDEB", "#6B48FF"]}
                style={styles.saveButtonGradient}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
    </ScrollView>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <View style={styles.infoItem}>
    <Ionicons name={icon} size={24} color="#6B48FF" style={styles.infoIcon} />
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F4FF" }, // Nền nhẹ nhàng
  errorText: { textAlign: "center", marginTop: 20, color: "#FF6F61" },
  header: {
    padding: 20,
    alignItems: "center",
    width: "100%",
    height: 480,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  botHeader: { alignItems: "center", width: "100%" },
  profileText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  avatar: {
    width: 260,
    height: 260,
    borderRadius: 130,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  editProfile: { flexDirection: "row", alignItems: "center" },
  editButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5,
  },
  textEdit: { fontSize: 18, color: "#fff", marginRight: 8, fontWeight: "600" },
  infoContainer: { padding: 20 },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoIcon: { marginRight: 15 },
  infoTextContainer: { flex: 1 },
  infoLabel: { fontSize: 16, color: "#888", fontWeight: "500" },
  infoValue: { fontSize: 18, fontWeight: "bold", color: "#333" },

  // Styles cho Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    borderRadius: 20,
    padding: 20,
    maxHeight: "85%",
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
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6B48FF",
  },
  modalContent: { marginBottom: 20 },
  label: {
    fontSize: 16,
    color: "#6B48FF",
    marginBottom: 8,
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
  saveButton: { alignItems: "center" },
  saveButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
