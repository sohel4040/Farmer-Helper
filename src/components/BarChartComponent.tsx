import React from "react";
import { View, StyleSheet } from "react-native";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { Text, G } from "react-native-svg";

// Sample Data
const sampleData = [
  { value: 50, label: "Apr" },
  { value: 80, label: "May" },
  { value: 90, label: "Jun" },
  { value: 75, label: "Jul" },
  { value: 60, label: "Aug" },
  { value: 85, label: "Sep" },
];

// Bar Labels Component
const BarLabels = ({ data }: any) => (
  <G>
    {data.map((item: any, index: number) => (
      <Text
        key={index}
        fontSize={14}
        fill="black"
        fontWeight="bold"
        textAnchor="middle"
      >
        {item.value}
      </Text>
    ))}
  </G>
);

const BarChartComponent = () => {
  const values = sampleData.map((item) => item.value);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", height: 250 }}>
        {/* Y-Axis Labels */}
        <YAxis
          data={values}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fontSize: 12, fill: "gray" }}
          numberOfTicks={5}
          formatLabel={(value) => `${value}`}
        />

        {/* Bar Chart */}
        <View style={{ flex: 1, marginLeft: 10 }}>
          <BarChart
            style={styles.chart}
            data={values}
            svg={{ fill: "#101826" }}
            contentInset={{ top: 20, bottom: 20 }}
            spacingInner={0.3}
            spacingOuter={0.2}
          >
            <Grid />
            <BarLabels />
          </BarChart>

          {/* X-Axis Labels */}
          <XAxis
            style={{ marginTop: 10 }} // Added margin-top to prevent label cutoff
            data={sampleData.map((item) => item.value)} // Extracting only numbers
            formatLabel={(value, index) => sampleData[index].label} // Mapping labels correctly
            contentInset={{ left: 20, right: 20 }}
            svg={{ fontSize: 12, fill: "black" }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4,
    marginBottom: 10,
  },
  chart: {
    flex: 1,
    borderRadius: 10,
  },
});

export default BarChartComponent;
