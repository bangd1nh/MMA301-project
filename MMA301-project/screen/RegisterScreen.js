import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { register } from '../data/userData';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const isValidPhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };

  const isValidPassword = () => {
    return password === confirmPassword;
  };

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword || !phone || !address) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Error", "Invalid email format.");
      return;
    }

    if (!isValidPhone(phone)) {
      Alert.alert("Error", "Phone number must be 10 digits.");
      return;
    }

    if (!isValidPassword()) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    const result = await register(name, email, password, phone, address);
    if (result.success) {
      Alert.alert("Registration Successful", result.message);
    } else {
      Alert.alert("Registration Failed", result.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      {/* Name Field */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email Field */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password Field */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Confirm Password Field */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Phone Field */}
      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      {/* Address Field */}
      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default RegisterScreen;

