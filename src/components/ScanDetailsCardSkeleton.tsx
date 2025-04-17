import React from "react";
import { View, StyleSheet } from "react-native";

const SkeletonBox = ({ width, height, borderRadius = 6 }: any) => (
  <View style={[styles.skeleton, { width, height, borderRadius }]} />
);

const ScanDetailsCardSkeleton = () => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <SkeletonBox width="60%" height={16} />
      <SkeletonBox width="40%" height={14} style={{ marginTop: 2 }} />

      {/* Main Value Section */}
      <View style={styles.mainSection}>
        <SkeletonBox width={80} height={28} />
        <SkeletonBox width={60} height={18} />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Lower Metrics Section */}
      <View style={styles.metricsContainer}>
        <SkeletonBox width="45%" height={14} />
        <SkeletonBox width="45%" height={14} />
      </View>

      <View style={styles.metricsContainer}>
        <SkeletonBox width="30%" height={14} />
        <SkeletonBox width="30%" height={14} />
      </View>

      {/* Bottom */}
      <SkeletonBox width="50%" height={12} style={{ marginTop: 12 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 14,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    // marginVertical: 6,
  },
  skeleton: {
    backgroundColor: "#E0E0E0",
    marginVertical: 5,
  },
  mainSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 16,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});

export default ScanDetailsCardSkeleton;
