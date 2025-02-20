import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const EditProfileScreen = ({ route, navigation }) => {

  const { profile, setProfile } = route.params;

  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);
  const [twitter, setTwitter] = useState(profile.twitter);
  const [facebook, setFacebook] = useState(profile.facebook);


  const saveProfile = () => {
    const updatedProfile = {
      name,
      email,
      phone,
      address,
      twitter,
      facebook,
    };
    setProfile(updatedProfile); 
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Twitter"
        value={twitter}
        onChangeText={setTwitter}
      />
      <TextInput
        style={styles.input}
        placeholder="Facebook"
        value={facebook}
        onChangeText={setFacebook}
      />

      <Button title="Save" onPress={saveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
});

export default EditProfileScreen;
