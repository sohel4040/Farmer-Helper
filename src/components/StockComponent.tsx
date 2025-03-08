import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const StockCard: React.FC = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>In-Stock Rate</Text>
        <Icon name="info-outline" size={16} color="gray" />
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.percentage}>94.15%</Text>
        <Text style={styles.value}>31.50</Text>
        <Text style={styles.percentageGreen}>61.50%</Text>
        <Icon name="arrow-upward" size={16} color="green" />
      </View>
    </View>
  );
};

const StockList: React.FC = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {[...Array(10)].map((_, index) => (
        <StockCard key={index} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  percentage: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 3,
  },
  value: {
    fontSize: 14,
    color: "gray",
    margin: 3,
  },
  percentageGreen: {
    fontSize: 14,
    color: "green",
    margin: 3,
  },
});

export { StockList };
