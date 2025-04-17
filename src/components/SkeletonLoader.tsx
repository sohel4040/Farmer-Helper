import React from "react";
import { View, StyleSheet } from "react-native";

const SkeletonLoader: React.FC = () => {
  return (
    <View style={{ marginTop: 8 }}>
      {[...Array(5)].map((_, idx) => (
        <View key={idx} style={styles.skeletonBox} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonBox: {
    height: 80,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 16,
    opacity: 0.5,
  },
});

export default SkeletonLoader;
