import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
  } from "react-native";
  import {
    Ionicons,
    MaterialCommunityIcons,
  } from "@expo/vector-icons";
  import React, { useState } from "react";
  import { login } from "../data/userData"; // Import hàm login từ users.js
  import { useNavigation } from "@react-navigation/native";

  function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showpass, setShowpass] = useState(true);
    const [checked, setChecked] = useState(false);
    const navigation = useNavigation();
  
    const handleLogin = () => {
      const result = login(email, password);
      if (result.success) {
        Alert.alert("Login Successful", `Welcome ${result.user.name}!`);
      } else {
        Alert.alert("Login Failed", result.message);
      }
    };
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: "white" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.header}>Welcome Back</Text>
            <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/6681/6681204.png'}} style={styles.image}></Image>
            <View style={styles.input}>
              <Ionicons name="mail-outline" size={24} color="black" />
              <TextInput 
                style={styles.textinput} 
                placeholder="Email" 
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.input}>
              <Ionicons name="lock-closed-outline" size={24} color="black" />
              <TextInput
                style={styles.textinput}
                secureTextEntry={showpass}
                placeholder="Password"
                placeholderTextColor="gray"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowpass(!showpass)}>
                <Ionicons
                  name={showpass ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color="black"
                  style={{ marginEnd: 10 }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={() => setChecked(!checked)}>
                <MaterialCommunityIcons
                  name={checked ? "checkbox-outline" : "checkbox-blank-outline"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <Text style={styles.checkboxText}>Remember Password</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.signupText}>
              Don't have an account? 
              <Text style={{ color: "black", fontWeight: "bold" }} 
              onPress={() => navigation.navigate("RegisterScreen")}> Sign up</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
  
  const styles = StyleSheet.create({
    image: {
        width: "30%",
        height: undefined,
        aspectRatio: 1, 
        alignSelf: "center",
        tintColor: "black",
        marginBottom: 20,
    },
    header: {
      fontSize: 30,
      textAlign: "center",
      fontWeight: "bold",
      color: "black",
    },
    input: {
      borderWidth: 2,
      marginBottom: 10,
      marginHorizontal: 30,
      paddingVertical: 12,
      borderRadius: 10,
      paddingStart: 10,
      flexDirection: "row",
      alignItems: "center",
      borderColor: "black",
      backgroundColor: "white",
    },
    textinput: {
      flex: 1,
      paddingHorizontal: 10,
      color: "black",
    },
    checkboxContainer: {
      flexDirection: "row",
      marginStart: 40,
      gap: 15,
      alignItems: "center",
    },
    checkboxText: {
      color: "gray",
      fontSize: 18,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 15,
      marginTop: 20,
    },
    buttonLogin: {
      backgroundColor: "black",
      paddingVertical: 12,
      alignItems: "center",
      paddingHorizontal: 70,
      borderRadius: 10,
    },
    buttonCancel: {
      backgroundColor: "gray",
      paddingVertical: 12,
      alignItems: "center",
      paddingHorizontal: 70,
      borderRadius: 10,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
    },
    signupText: {
      textAlign: "center",
      marginTop: 30,
      color: "black",
    },
  });
  
  export default LoginScreen;