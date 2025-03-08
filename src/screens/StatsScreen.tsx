import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import BarChartComponent from "../components/BarChartComponent";
import ScanButton from "../components/ScanButton";
import StatsCard from "../components/StatsCard";
import { StockList } from "../components/StockComponent";

const StatsScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Stats</Text>
      </View>
      <StatsCard />
      <BarChartComponent />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <StockList />
      </ScrollView>
      <ScanButton title="View Latest Updates" />
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
  scrollContainer: {
    paddingBottom: 20, // Ensures spacing at the bottom when scrolling
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default StatsScreen;
