import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageRecord } from "../types";

export default function MapsScreen() {
  const { mainData } = useLocalSearchParams();
  const mapsData = JSON.parse(mainData as string);

  const affectedPlants = [
    { latitude: 18.428143, longitude: 73.662102, disease: "Leaf Rust" },
    { latitude: 18.428233, longitude: 73.662102, disease: "Anthracnose" },
    { latitude: 18.428053, longitude: 73.662102, disease: "Powdery Mildew" },
    { latitude: 18.428143, longitude: 73.662192, disease: "Bacterial Canker" },
    { latitude: 18.428143, longitude: 73.662012, disease: "Sooty Mold" },
    { latitude: 18.428233, longitude: 73.662192, disease: "Fruit Rot" },
    { latitude: 18.428053, longitude: 73.662192, disease: "Red Rust" },
    { latitude: 18.428233, longitude: 73.662012, disease: "Black Spot" },
    { latitude: 18.428053, longitude: 73.662012, disease: "Leaf Blight" },
  ];

  // const affectedPlants = useMemo(
  //   () =>
  //     mapsData
  //       .filter((record: ImageRecord) => record.label !== "Healthy")
  //       .map((record: ImageRecord) => ({
  //         latitude: parseFloat(record.latitude),
  //         longitude: parseFloat(record.longitude),
  //         disease: record.label,
  //       })),
  //   [mapsData]
  // );
  const initialRegion = useMemo(() => {
    const lats = affectedPlants.map((p: { latitude: any }) => p.latitude);
    const lngs = affectedPlants.map((p: { longitude: any }) => p.longitude);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latitude = (minLat + maxLat) / 2;
    const longitude = (minLng + maxLng) / 2;

    const latitudeDelta = (maxLat - minLat) * 1.5 || 0.01; // fallback for single point
    const longitudeDelta = (maxLng - minLng) * 1.5 || 0.01;

    return {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };
  }, [affectedPlants]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >  
            <Ionicons name="chevron-back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Scan {mapsData[0]?.scan_id} - Affected Plants</Text>
        </View>
        <MapView
          style={styles.map}
          // initialRegion={{
          //   latitude: 18.5204,
          //   longitude: 73.8567,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}
          initialRegion={initialRegion}
          mapType="hybrid"
        >
          {/* <Marker coordinate={{  latitude: 18.5204,
  longitude: 73.8567 }} /> */}

          {affectedPlants.map((plant: any, index: any) => (
            <Marker
              key={index}
              coordinate={{
                latitude: plant.latitude,
                longitude: plant.longitude,
              }}
              pinColor="red"
            >
              <Callout>
                <View>
                  <Text style={{ fontWeight: "bold" }}>Affected Plant</Text>
                  <Text>Infected: {plant.disease}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  // header: {
  //   position: "absolute",
  //   top: 60,
  //   left: 20,
  //   alignSelf: "center",
  //   zIndex: 999,
  //   backgroundColor: "rgba(255, 255, 255, 0.9)",
  //   borderRadius: 8,
  //   paddingHorizontal: 12,
  //   paddingVertical: 6,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
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
  }
});
