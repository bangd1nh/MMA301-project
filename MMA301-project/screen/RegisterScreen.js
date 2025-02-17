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

  const isValidEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);
  const isValidPassword = () => password === confirmPassword;

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
    Alert.alert(result.success ? "Success" : "Error", result.message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account</Text>

      {[
        { placeholder: "Name", value: name, onChangeText: setName, icon: "person-outline" },
        { placeholder: "Email", value: email, onChangeText: setEmail, icon: "mail-outline", keyboardType: "email-address" },
        { placeholder: "Password", value: password, onChangeText: setPassword, icon: "lock-closed-outline", secureTextEntry: true },
        { placeholder: "Confirm Password", value: confirmPassword, onChangeText: setConfirmPassword, icon: "lock-closed-outline", secureTextEntry: true },
        { placeholder: "Phone", value: phone, onChangeText: setPhone, icon: "call-outline", keyboardType: "phone-pad" },
        { placeholder: "Address", value: address, onChangeText: setAddress, icon: "location-outline" },
      ].map((field, index) => (
        <View key={index} style={styles.inputContainer}>
          <Ionicons name={field.icon} size={24} color="#444" />
          <TextInput
            style={styles.input}
            placeholder={field.placeholder}
            placeholderTextColor="#888"
            value={field.value}
            onChangeText={field.onChangeText}
            secureTextEntry={field.secureTextEntry}
            keyboardType={field.keyboardType}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Already have an account? <Text style={styles.link}>Log in</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F8FA',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 45,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#1E88E5',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: "#1E88E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 15,
  },
  link: {
    color: '#1E88E5',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
