import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import ScanDetailsCard from "../components/ScanDetailsCard";
import BarChartComponent from "../components/BarChartComponent";
import ScanButton from "../components/ScanButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { ScanHeader } from "../types";
import { ImageRecord } from "../types";
import ScanDetailsCardSkeleton from "../components/ScanDetailsCardSkeleton";
import BarChartSkeleton from "../components/BarChartSkeleton";

const ScanDetailsScreen: React.FC = () => {
  const router = useRouter();
  const { name, location, date, status, scan_id } = useLocalSearchParams();
  const { user, logout } = useAuth();
  const [scanHeader, setScanHeader] = useState<ScanHeader>({
    healthyCount: 0,
    nonHealthyCount: 0,
    percentageLeavesAffected: 0,
  });
  const [mainData, setMainData] = useState<ImageRecord[]>([]);

  const [loadingHeader, setLoadingHeader] = useState(true);
  const [loadingMainData, setLoadingMainData] = useState(true);

  const fetchHeader = async () => {
    setLoadingHeader(true);
    const payload = {
      mob_no: Number(user?.mobile),
      scan_id: scan_id,
    };
    await fetch(
      "https://276weygzmg.execute-api.ap-south-1.amazonaws.com/prod/getScanHeaderData",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const scanHeader = JSON.parse(data.body);
        setScanHeader(scanHeader);
      })
      .catch((error) => {
        setLoadingHeader(false);
        alert("Something went wrong");
        return;
      });
    setTimeout(() => {
      setLoadingHeader(false);
    }, 500);
  };

  const fetchMainScanData = async () => {
    setLoadingMainData(true);
    const payload = {
      mob_no: Number(user?.mobile),
      scan_id: scan_id,
    };
    await fetch(
      "https://276weygzmg.execute-api.ap-south-1.amazonaws.com/prod/getScanMainData",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const parsedData = JSON.parse(data.body);
        setMainData(parsedData);
      })
      .catch((error) => {
        setLoadingMainData(false);
        alert("Something went wrong");
        return;
      });
    setTimeout(() => {
      setLoadingMainData(false);
    }, 500);
  };

  useEffect(() => {
    fetchHeader();
    fetchMainScanData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Scan Details</Text>
        </View>
        {loadingHeader ? (
          <ScanDetailsCardSkeleton />
        ) : (
          <ScanDetailsCard
            name={name as string}
            location={location as string}
            date={date as string}
            status={status as "success" | "error" | "default"}
            nonHealthyCount={scanHeader.nonHealthyCount}
            healthyCount={scanHeader.healthyCount}
            percentageLeavesAffected={scanHeader.percentageLeavesAffected}
          />
        )}

        <Text style={styles.sectionTitle}>Analysis</Text>
        {loadingMainData ? (
          <BarChartSkeleton length={5} />
        ) : (
          <BarChartComponent mainData={mainData} />
        )}

        <ScanButton
          title="View in Map"
          onPress={() =>
            router.push({
              pathname: "/maps",
              params: {
                mainData: JSON.stringify(mainData),
              },
            })
          }
        />
        <ScanButton
          title="View Images"
          onPress={() =>
            router.push({
              pathname: "/images",
              params: {
                mainData: JSON.stringify(mainData),
              },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  scanCard: {
    backgroundColor: "#EAEAEA",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    marginBottom: 20,
  },
  scanLeft: {
    flex: 1,
  },
  scanRight: {
    alignItems: "flex-end",
  },
  scanLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scanSubText: {
    fontSize: 14,
    color: "#555",
  },
  highlight: {
    fontWeight: "bold",
    color: "red",
  },
  scanLocation: {
    fontSize: 14,
    fontWeight: "bold",
  },
  scanDate: {
    fontSize: 12,
    color: "#777",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  chart: {
    borderRadius: 10,
    marginVertical: 10,
  },
  summaryText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
    lineHeight: 20,
  },
});

export default ScanDetailsScreen;
