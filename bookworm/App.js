import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Book from "./(components)/Book";

// author info: https://openlibrary.org/authors/{AUTHOR_KEY}.json
// book info:   https://openlibrary.org/isbn/{ISBN}.json
// book cover:  https://covers.openlibrary.org/b/isbn/{ISBN}-M.jpg

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();

  const [hasScannedBarcode, setHasScannedBarCode] = useState(false);

  const [barCode, setBarCode] = useState(0);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  // const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [genres, setGenres] = useState([]);
  const [numPages, setNumPages] = useState(0);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function setUpBookInfo(resBook) {
    console.log(resBook.ok);
    if (resBook.ok) {
      let bookInfo = resBook.json();
      setTitle(bookInfo.title);
      setSubtitle(bookInfo.subtitle);
      setDescription(bookInfo.description.value);
      setNumPages(bookInfo.number_of_pages);
      setGenres(bookInfo.genres);
    }
  }

  function getCoverImage(ISBN) {
    fetch(`https://covers.openlibrary.org/b/isbn/${ISBN}-M.jpg`).then(
      (resCover) => {
        if (resCover.ok) {
          setCoverImage(`https://covers.openlibrary.org/b/isbn/${ISBN}-M.jpg`);
        }
      }
    );
  }

  function getBookInfo(barcodeScanningResult) {
    // Callback function triggered when barcode is detected in image
    setBarCode(barcodeScanningResult.data);
    console.log(barCode); // testing
    // author info: https://openlibrary.org/authors/{AUTHOR_KEY}.json
    // book info:   https://openlibrary.org/isbn/{ISBN}.json
    // book cover:  https://covers.openlibrary.org/b/isbn/{ISBN}-M.jpg
    fetch(`https://openlibrary.org/isbn/${barCode}.json`)
      .then(getBookInfo)
      .then(getCoverImage)
      .then(console.log(title));
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          enableTorch={true}
          // If a barcode has been scanned, 
          // don't scan again UNLESS the barcode being scanned is different from the current stored barcode
          onBarcodeScanned={
            hasScannedBarcode
              ? (barcodeScanningResult) => {
                  if (barcodeScanningResult.data != barCode) {
                    // If a barcode has already been scanned but this one's different, then proceed
                    getBookInfo;
                  } else {
                    // Otherwise do nothing
                    () => {};
                  }
                }
              : getBookInfo // If a barcode hasn't yet been scanned at all, then proceed
          }
        >
          <View style={styles.buttonContainer}></View>
          <Button
            title={"Print ISBN"}
            style={styles.button}
            onPress={() => {
              console.log(ISBN);
              console.log(title);
            }}
          ></Button>
        </CameraView>
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
