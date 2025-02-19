import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getUserById } from "../data/userData";

const userProfile = getUserById(1);

const ProfileScreen = () => {
  const [profile, setProfile] = useState(userProfile);
  const navigation = useNavigation();

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User data is missing!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <Text style={styles.profileText}>Profile</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#fff"
              style={styles.backIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.botHeader}>
          <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
          <Text style={styles.name}>{profile.name}</Text>
          <TouchableOpacity
            style={styles.editProfile}
            onPress={() =>
              navigation.navigate("EditProfile", {
                userProfile: profile,
                setUserProfile: setProfile,
              })
            }
          >
            <Text style={styles.textEdit}>Edit Profile</Text>
            <Ionicons name={"pencil-outline"} size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

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
    </ScrollView>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <View style={styles.infoItem}>
    <Ionicons name={icon} size={20} color="#333" style={styles.infoIcon} />
    <View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  errorText: { textAlign: "center", marginTop: 20, color: "red" },
  header: {
    backgroundColor: "#007AFF",
    padding: 20,
    alignItems: "center",
    width: "100%",
    height: 470,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  botHeader: {
    alignItems: "center",
    width: "100%",
  },
  backIcon: { marginRight: 10, fontSize: 40 },
  profileText: { color: "#fff", fontSize: 25, fontWeight: "bold" },
  avatar: { width: 250, height: 250, borderRadius: 400, marginBottom: 10 },
  name: { fontSize: 25, fontWeight: "bold", color: "#fff" },
  infoContainer: { padding: 20, flex: 1 },
  editProfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  textEdit: { fontSize: 20 },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    flex: 1,
    width: "100%",
    paddingBottom: 30,
  },
  infoIcon: { marginRight: 10, fontSize: 35 },
  infoLabel: { fontSize: 20, color: "#777" },
  infoValue: { fontSize: 22, fontWeight: "bold", color: "#333" },
});

export default ProfileScreen;
