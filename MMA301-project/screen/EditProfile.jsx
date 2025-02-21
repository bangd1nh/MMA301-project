import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EditProfile = () => {
  const [name, setName] = useState("James Martin");
  const [email, setEmail] = useState("james012@gmail.com");
  const [phone, setPhone] = useState("1234567891");
  const [address, setAddress] = useState(
    "K52/65 Lê Văn Liêm, Hải Châu, Đà Nẵng"
  );
  const [twitter, setTwitter] = useState("@james012");
  const [facebook, setFacebook] = useState("www.facebook.com/james012");

  const handleSubmit = () => {
    console.log({
      name,
      email,
      phone,
      address,
      twitter,
      facebook,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="menu" size={30} color="black" style={styles.menuIcon} />
        <Ionicons
          name="arrow-back"
          size={30}
          color="black"
          style={styles.backIcon}
        />
      </View>
      <Text style={styles.title}>Edit Profile</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person" size={30} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ex. John Doe"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={30} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ex: johndoe@mail.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="call" size={30} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ex: 1234567891"
          keyboardType="numeric"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="location" size={30} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ex: K52/65 Lê Văn Liêm, Hải Châu"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="logo-twitter"
          size={30}
          color="gray"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Ex: @james012"
          value={twitter}
          onChangeText={setTwitter}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="logo-facebook"
          size={30}
          color="gray"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Ex: www.facebook.com/james012"
          value={facebook}
          onChangeText={setFacebook}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.textButton}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#53224",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
  },
  saveButton: {
    width: "100%",
    height: "50",
    backgroundColor: "#2C6B2F",
    marginTop: "25",
    borderRadius: 10,
  },
  textButton: {
    flex: 1,
    alignItems: "center",
    color: "#ffffff",
    textAlign: "center",
    fontSize: 19,
    fontWeight: "bold",
    paddingTop: 15,
  },
  headerContainer: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    padding: 10,
    marginTop: 20,
    backgroundColor: "#fff",
  },
  menuIcon: {
    marginLeft: 10,
  },
  backIcon: {
    marginRight: 10,
  },
});

export default EditProfile;
