import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { decodeSingle } from "quagga";
import { Camera } from "expo-camera";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>welcome to bookworm!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
