import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Trangchu from "./screen/trangchu";
import { ScrollView } from "react-native";

export default function App() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Trangchu></Trangchu>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
});
