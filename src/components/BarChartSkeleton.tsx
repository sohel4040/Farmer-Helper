import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

type BarChartSkeletonProps = {
  length: number;
};
const BarChartSkeleton: React.FC<BarChartSkeletonProps> = ({ length }) => {
  const screenHeight = Dimensions.get("window").height;

  // Adjust the chart height based on a percentage of the screen height
  const chartHeight = screenHeight * 0.3;
  return (
    <View style={[styles.container, { height: chartHeight }]}>
      <View style={styles.yAxis} />

      {/* Bar chart area */}
      <View style={styles.chartContainer}>
        {/* Fake bars */}
        <View style={styles.barsRow}>
          {Array.from({ length: length }).map((_, index) => (
            <View key={index} style={styles.barGroup}>
              <View
                style={[styles.bar, { height: `${30 + Math.random() * 50}%` }]}
              />
              <View style={styles.label} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight:10,
    paddingTop:10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    elevation: 4,
    flexDirection: "row",
    marginBottom: 10,
  },
  yAxis: {
    width: 30,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
    borderRadius: 6,
  },
  chartContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  barsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: "100%",
  },
  barGroup: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bar: {
    width: 40,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  label: {
    width: 30,
    height: 10,
    backgroundColor: "#f0f0f0",
    marginTop: 8,
    borderRadius: 4,
  },
});

export default BarChartSkeleton;
