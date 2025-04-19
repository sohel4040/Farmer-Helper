import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { ImageRecord } from "../types";

export const countLabels = (records: ImageRecord[]) => {
  const labelCounts: Record<string, number> = {};
  records.forEach((record) => {
    labelCounts[record.label] = (labelCounts[record.label] || 0) + 1;
  });

  const sampleData = Object.entries(labelCounts).map(([label, count]) => ({
    label,
    value: count,
  }));

  return sampleData;
};

// Abbreviate long disease names
const abbreviate = (label: string) => {
  const words = label.split(" ");
  return words.length === 1
    ? label.slice(0, 6) + "."
    : words.map((word) => word[0] + ".").join("");
};

type BarChartComponentProps = {
  mainData: ImageRecord[];
};

const BarChartComponent: React.FC<BarChartComponentProps> = ({ mainData }) => {
  const rawData = countLabels(mainData);

  const formattedData = rawData.map((item) => ({
    value: item.value,
    label: item.label !== "Healthy" ? abbreviate(item.label) : "Healthy",
    labelTextStyle: { color: "black", fontSize: 12 },
    frontColor: "#101826",
    barWidth: 38,
  }));
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const chartHeight = screenHeight * 0.3;

  return (
    <View style={[styles.container, { height: chartHeight }]}>
      <Text style={styles.title}>Disease Occurrence</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BarChart
          barBorderRadius={6}
          data={formattedData}
          height={chartHeight * 0.72}
          width={screenWidth / 1.5}
          yAxisThickness={1}
          xAxisThickness={1}
          xAxisColor="#d1d5db"
          yAxisColor="#d1d5db"
          isAnimated
          hideRules
          xAxisLabelTextStyle={{ color: "black" }}
          yAxisTextStyle={{ color: "gray" }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default BarChartComponent;
