// import React from "react";
// import { View, StyleSheet } from "react-native";
// import { BarChart, Grid, XAxis, YAxis } from "react-native-gifted-charts";
// import { Text, G } from "react-native-svg";
// import { ImageRecord } from "../types";

// // Sample Data
// // const sampleData = [
// //   { label: 'Anthracnose', value: 24 },
// //   { label: 'Bacterial Canker', value: 17 },
// //   { label: 'Cutting Weevil', value: 9 },
// //   { label: 'Die Back', value: 13 },
// //   { label: 'Gall Midge', value: 7 },
// //   { label: 'Healthy', value: 30 },
// //   { label: 'Powdery Mildew', value: 18 },
// //   { label: 'Sooty Mould', value: 11 },
// // ];
// export const countLabels = (records: ImageRecord[]) => {
//   const labelCounts: Record<string, number> = {};
//   console.log("Callinggggggggg")
//   records.forEach((record) => {
//     labelCounts[record.label] = (labelCounts[record.label] || 0) + 1;
//   });

//   const sampleData = Object.entries(labelCounts).map(([label, count]) => ({
//     label,
//     value: count,
//   }));

//   return sampleData;
// };

// const abbreviate = (label: string) => {
//   const words = label.split(' ');
//   return words.length === 1
//     ? label.slice(0, 6) + '.'
//     : words.map(word => word[0] + '.').join(' ');
// };

// // Bar Labels Component
// const BarLabels = ({ data }: any) => (
//   <G>
//     {data.map((item: any, index: number) => (
//       <Text
//         key={index}
//         fontSize={12}
//         fill="black"
//         fontWeight="bold"
//         textAnchor="middle"
//       >
//         {item.value}
//       </Text>
//     ))}
//   </G>
// );

// type BarChartComponentProps  = {
//   mainData : ImageRecord[]
// }
// const getInsetBasedOnBarCount = (barCount: number) => {
//   const maxInset = 50;
//   const minInset = 20;

//   // If only 1 bar: maxInset. If 10+ bars: minInset.
//   const inset = Math.max(minInset, maxInset - barCount * 3);

//   return {
//     left: inset,
//     right: inset,
//   };
// };

// const BarChartComponent: React.FC<BarChartComponentProps> = ({
// mainData
// }) => {
//   const rawData = countLabels(mainData)
//   const formattedData = rawData.map((item) => ({
//   value: item.value,
//   label: item.label !== "Healthy" ? abbreviate(item.label) : "Healthy",
//   fullLabel: item.label,
//   frontColor: '#4B9EFF',
// }))
//   const values = formattedData.map((item) => item.value);

//   return (
//     <View style={styles.container}>
//       <View style={{ flexDirection: "row", height: 250 }}>
//         {/* Y-Axis Labels */}
//         <YAxis
//           data={values}
//           contentInset={{ top: 20, bottom: 20 }}
//           svg={{ fontSize: 12, fill: "gray" }}
//           numberOfTicks={5}
//           formatLabel={(value) => `${value}`}
//         />

//         {/* Bar Chart */}
//         <View style={{ flex: 1, marginLeft: 10 }}>
//           <BarChart
//             style={styles.chart}
//             data={values}
//             svg={{ fill: "#101826" }}
//             contentInset={{ top: 20, bottom: 20 }}
//             spacingInner={0.3}
//             spacingOuter={0.2}
//           >
//             <BarLabels />
//           </BarChart>

//           {/* X-Axis Labels */}
//           <XAxis
//             style={{ marginTop: 10 }}
//             data={formattedData.map((item) => item.value)}
//             formatLabel={(value, index) => formattedData[index].label}
//             contentInset={getInsetBasedOnBarCount(formattedData.length)}
//             svg={{ fontSize: 12, fill: "black" }}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: 300,
//     padding: 20,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     elevation: 4,
//     marginBottom: 10,
//   },
//   chart: {
//     flex: 1,
//     borderRadius: 10,
//   },
// });

// export default BarChartComponent;

import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions, LayoutChangeEvent } from "react-native";
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
    barWidth:38,
  }));
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get("window").height;

  const chartHeight = screenHeight * 0.3;

  return (
    <View style={[styles.container, { height: chartHeight }]}>
      <Text style={styles.title}>Disease Occurrence</Text>
      <BarChart
        barBorderRadius={6}
        data={formattedData}
        width={screenWidth/1.5} // Adjusted width for the chart
        yAxisThickness={1}
        xAxisThickness={1}
        xAxisColor="#d1d5db"
        yAxisColor="#d1d5db"
        isAnimated
        hideRules
        xAxisLabelTextStyle={{ color: "black" }}
        yAxisTextStyle={{ color: "gray" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight:10,
    paddingTop:10,
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
