import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ScanDetailsCardProps = {
  name: string;
  location: string;
  date: string;
  status: "success" | "error" | "default";
  nonHealthyCount: number;
  healthyCount: number;
  percentageLeavesAffected: number;
};

const ScanDetailsCard: React.FC<ScanDetailsCardProps> = ({
  name,
  location,
  date,
  status,
  nonHealthyCount,
  healthyCount,
  percentageLeavesAffected,
}) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <Text style={styles.header}>{name}</Text>
      <Text style={styles.subHeader}>{location}</Text>

      {/* Main Value Section */}
      <View style={styles.mainSection}>
        <Text style={styles.mainValue}>
          {percentageLeavesAffected?.toFixed(2)}%
        </Text>
        <View style={styles.trendContainer}>
          <Text style={styles.trendValue}>38.00%</Text>
          <Ionicons name="arrow-down-outline" size={18} color="#D32F2F" />
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Lower Metrics Section */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricBox}>
          <Text style={styles.metricTitle}>Leaves Affected</Text>
          <Text style={styles.metricValue}>{nonHealthyCount}</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricTitle}>Healthy Leaves</Text>
          <Text style={styles.metricValue}>{healthyCount}</Text>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        <Ionicons name="calendar-outline" size={16} color="#6C757D" />
        <Text style={styles.bottomTitle}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 14,
    elevation: 5, 
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E2A38",
  },
  subHeader: {
    fontSize: 13,
    color: "#6C757D",
    marginBottom: 12,
  },
  mainSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#D32F2F",
  },
  trendContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDECEC",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  trendValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#D32F2F",
    marginRight: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 16,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metricBox: {
    flex: 1,
  },
  metricTitle: {
    fontSize: 12,
    color: "#6C757D",
  },
  metricValue: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1E2A38",
    marginTop: 4,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  bottomTitle: {
    fontSize: 13,
    color: "#6C757D",
    marginLeft: 6,
  },
  bottomValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E2A38",
    marginLeft: 6,
  },
});

export default ScanDetailsCard;
