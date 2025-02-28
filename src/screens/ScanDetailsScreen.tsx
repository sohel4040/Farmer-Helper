import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import ScanDetailsCard from "../components/ScanDetailsCard";
import BarChartComponent from "../components/BarChartComponent";

const ScanDetailsScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Scan Details</Text>
      </View>

      <ScanDetailsCard />
      {/* Analysis Section */}
      <Text style={styles.sectionTitle}>📊 Analysis</Text>

      <BarChartComponent />

      {/* Summary Section */}
      <Text style={styles.sectionTitle}>📄 Summary</Text>
      <Text style={styles.summaryText}>
        This scan shows a significant increase in affected crops during peak
        seasons. Immediate action is recommended to prevent further spread and
        minimize yield loss.
      </Text>
    </View>
  );
};

// ⬇️ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
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
  scanCard: {
    backgroundColor: "#EAEAEA",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    marginBottom: 20,
  },
  scanLeft: {
    flex: 1,
  },
  scanRight: {
    alignItems: "flex-end",
  },
  scanLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scanSubText: {
    fontSize: 14,
    color: "#555",
  },
  highlight: {
    fontWeight: "bold",
    color: "red",
  },
  scanLocation: {
    fontSize: 14,
    fontWeight: "bold",
  },
  scanDate: {
    fontSize: 12,
    color: "#777",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  chart: {
    borderRadius: 10,
    marginVertical: 10,
  },
  summaryText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
    lineHeight: 20,
  },
});

export default ScanDetailsScreen;
