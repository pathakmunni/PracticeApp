import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import axios from "axios";

const ImageUploadScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const openImagePicker = () => {
    Alert.alert("Select Image", "Choose source", [
      { text: "Camera", onPress: () => handleImagePick("camera") },
      { text: "Gallery", onPress: () => handleImagePick("gallery") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleImagePick = (type: "camera" | "gallery") => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: "photo",
      quality: 0.8,
    };

    const callback = (response: ImagePicker.ImagePickerResponse) => {
      if (response.didCancel) return;
      if (response.errorMessage) Alert.alert("Error", response.errorMessage);
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    };

    if (type === "camera") ImagePicker.launchCamera(options, callback);
    else ImagePicker.launchImageLibrary(options, callback);
  };

  const handleUpload = async () => {
    if (!imageUri) {
      Alert.alert("No image selected");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        name: "photo.jpg",
        type: "image/jpeg",
      } as any);

      // Fake upload endpoint (you can replace with your API)
      const response = await axios.post("https://reqres.in/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          console.log("Upload Progress:", progress, "%");
        },
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert("Success", "Image uploaded successfully!");
      } else {
        Alert.alert("Error", "Upload failed. Try again.");
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Profile Image</Text>

      <TouchableOpacity style={styles.imageBox} onPress={openImagePicker}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.placeholder}>Tap to select image</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.uploadButton, uploading && { opacity: 0.6 }]}
        onPress={handleUpload}
        disabled={uploading}
      >
        {uploading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Upload</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  imageBox: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#f1f1f1",
  },
  imagePreview: { width: "100%", height: "100%" },
  placeholder: { color: "#888" },
  uploadButton: {
    backgroundColor: "#007AFF",
    marginTop: 25,
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});

export default ImageUploadScreen;
