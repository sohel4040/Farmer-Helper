import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageRecord } from "../types";

const classLabels = [
  "Anthracnose",
  "Bacterial Canker",
  "Cutting Weevil",
  "Die Back",
  "Gall Midge",
  "Healthy",
  "Powdery Mildew",
  "Sooty Mould",
];

const ImageGalleryScreen = () => {
  const [selectedLabel, setSelectedLabel] = useState("All Images");
  const theme = useColorScheme();
  const { mainData} = useLocalSearchParams();
  const imagesData = JSON.parse(mainData as string);

  const filterData = imagesData.filter((img: ImageRecord) => img.label === selectedLabel)
  const filteredImages =
    selectedLabel === "All Images"
      ? imagesData
      : filterData;

  const count = selectedLabel === "All Images" ? imagesData.length : filterData.length

  const renderChip = (label: string) => (
    <TouchableOpacity
      key={label}
      style={[styles.chip, selectedLabel === label && styles.selectedChip]}
      onPress={() => setSelectedLabel(label)}
    >
      <Text
        style={[
          styles.chipText,
          selectedLabel === label && styles.selectedText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={[styles.container, { backgroundColor: "white" }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Captured Images</Text>
        <Text style={styles.countText}>({count})</Text>

      </View>
        <View style={{ marginBottom: 10 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipRow}
            style={{ flexGrow: 0 }}
          >
            {["All Images", ...classLabels].map(renderChip)}
          </ScrollView>
        </View>

        {filteredImages.length === 0 ? (
          <Text style={styles.noImageText}>No images found.</Text>
        ) : (
          <FlatList
            data={filteredImages}
            keyExtractor={(item) => item.image_url}
            numColumns={2}
            contentContainerStyle={{ paddingVertical: 10 }}
            renderItem={({ item }) => (
              <View style={styles.imageCard}>
                <Image source={{ uri: item.image_url }} style={styles.image} />
                <Text style={styles.label}>{item.label}</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const screenWidth = Dimensions.get("window").width;
const imageSize = (screenWidth - 60) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  countText: {
    fontSize: 16,
    color: "gray",
    marginTop: 4,
    marginLeft: 4,
  },  
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    // borderWidth: 1,
    // borderColor: "gray",
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',

  },
  chipRow: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  selectedChip: {
    backgroundColor: '#000',
    borderColor: "#000",

    // backgroundColor: "#007bff",
    // borderColor: "#007bff",
  },
  chipText: {
    color: "black",
  },
  selectedText: {
    color: "white",
  },
  imageCard: {
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
    width: imageSize,
  },
  image: {
    width: "100%",
    height: imageSize,
    borderRadius: 12,
  },
  label: {
    marginTop: 4,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    color: "gray",
  },
  noImageText: {
    textAlign: "center",
    marginTop: 40,
    color: "gray",
    fontSize: 16,
  },
});

export default ImageGalleryScreen;
