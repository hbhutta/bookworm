import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [ISBN, setISBN] = useState(0);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function takePhoto() {
    console.log("Taking photo...");
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={facing} enableTorch={true} onBarcodeScanned={(barcodeScanningResult) => {
          setISBN(barcodeScanningResult.data); 
          console.log(ISBN); // testing
        }}>
          <View style={styles.buttonContainer}></View>
        </CameraView>
        <View style={styles.buttonOptions}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    maxHeight: 500,
    minWidth: 300,
    borderWidth: 1,
    borderColor: "white",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  buttonOptions: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "white",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    marginHorizontal: 10,
    padding: 20,
    backgroundColor: "orange",
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
