import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type ScanItemProps = {
  name: string;
  location: string;
  date: string;
  status: "success" | "error" | "default";
};

const ScanItem: React.FC<ScanItemProps> = ({
  name,
  location,
  date,
  status,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.scanCard}
      activeOpacity={0.7}
      onPress={() => router.push("/scan-details")}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.scanTitle, styles[status]]}>{name}</Text>
        <Text style={styles.scanLocation}>{location}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.scanDate}>{date}</Text>
        <MaterialIcons name="chevron-right" size={22} color="gray" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scanCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
  },
  scanTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  scanLocation: {
    color: "gray",
    fontSize: 14,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  scanDate: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginRight: 5,
  },
  success: { color: "green" },
  error: { color: "red" },
  default: { color: "black" },
});

export default ScanItem;
