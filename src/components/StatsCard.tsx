import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const StatsCard: React.FC = () => {
  const { width } = useWindowDimensions(); // Dynamically fetch screen width

  return (
    <View style={[styles.cardContainer, { width: width * 0.9 }]}>
      <Text style={styles.title}>Net PPM vs. Target PPM</Text>
      <Text style={styles.percentage}>50.00%</Text>
      <View style={styles.subContainer}>
        <Text style={styles.percentageGray}>38.00%</Text>
        <Icon name="arrow-downward" size={16} color="gray" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    // marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: "center", // Centers card on screen
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  percentage: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  percentageGray: {
    fontSize: 18,
    color: "gray",
    marginRight: 5,
  },
});

export default StatsCard;
