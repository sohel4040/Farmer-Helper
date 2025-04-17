import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
  Alert,
  Button,
} from "react-native";
import ScanButton from "../components/ScanButton";
import SearchBar from "../components/SearchBar";
import ScanList from "../components/ScanList";
import { Scan } from "../types";
import * as Location from "expo-location";
import { useAuth } from "@/context/AuthContext";
import SkeletonLoader from "../components/SkeletonLoader";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getBase64 } from "../services/Base64ImageService";

const HomeScreen: React.FC = () => {
  const [showInputModal, setShowInputModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [scanId, setScanId] = useState("");
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [isScanModalVisible, setIsScanModalVisible] = useState<boolean>(false);
  const [label, setLabel] = useState<string>();
  const [isProcessingModalVisible, setIsProcessingModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    setLoading(true);
    const payload = {
      mob_no: Number(user?.mobile),
    };
    await fetch(
      "https://276weygzmg.execute-api.ap-south-1.amazonaws.com/prod/fetchScanDetails",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const rawScans = JSON.parse(data.body);
        const scans: Scan[] = rawScans
          .sort(
            (a: any, b: any) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
          .map((item: any, index: number): Scan => {
            const date = new Date(item.timestamp);
            const formattedDate = date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });

            return {
              scan_id: item.scan_id,
              name: `Scan #${item.scan_id}`,
              location: `${item.city}`,
              date: formattedDate,
              status: "success",
            };
          });
        setScans(scans);
      })
      .catch((error) => {
        setLoading(false);
        alert("Something went wrong");
        return;
      });
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const handleStartScan = async () => {
    setShowInputModal(false);
    setProgress(0);
    setShowLoadingModal(true);
    const timestamp = new Date().toISOString();
    console.log(timestamp);

    try {
      // Request location permission
      // const { status } = await Location.requestForegroundPermissionsAsync();
      // if (status !== "granted") {
      //   console.log("Location permission not granted");
      //   return;
      // }

      // Get current location
      // const location = await Location.getCurrentPositionAsync({});
      // const { latitude, longitude } = location.coords;
      const latitude = 18.531142643216008,
        longitude = 73.85508127464111;
      console.log("Lat:", latitude, "Lng:", longitude);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            "User-Agent": "Krushify/1.0 (sohelbargir2@gmail.com)",
          },
        }
      );

      const data = await response.json();
      const city =
        data?.address?.city ||
        data?.address?.town ||
        data?.address?.village ||
        "Unknown";

      const payload = {
        mob_no: Number(user?.mobile),
        scan_id: scanId,
        location_lat: latitude.toString(),
        location_long: longitude.toString(),
        city,
        timestamp,
      };

      console.log("Data to send:", payload);

      await fetch(
        "https://276weygzmg.execute-api.ap-south-1.amazonaws.com/prod/createScan",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const message = {
            mob_no: user?.mobile,
            action: "start",
            scan_id: scanId,
          };
          fetch(
            "https://276weygzmg.execute-api.ap-south-1.amazonaws.com/prod/publishIotMessage",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(message),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              console.log("Data sent to IOT node", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (err) {
      console.error("Error during scan start:", err);
    }
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);
          return 1;
        }
        return prev + 0.01;
      });
    }, 100);
  };

  const handleStopScan = async () => {
    setShowLoadingModal(false);
    setProgress(0);
    const message = {
      mob_no: user?.mobile,
      action: "stop",
      scan_id: scanId,
    };
    console.log(message);
    await fetch(
      "https://276weygzmg.execute-api.ap-south-1.amazonaws.com/prod/publishIotMessage",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Stopped", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    await fetchScans();
    setScanId("");
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Camera Permission Required", "Please grant camera access");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (
      result &&
      !result.canceled &&
      result.assets &&
      result.assets.length > 0
    ) {
      const capturedImageUri = result.assets[0].uri;
      if (capturedImageUri) {
        setIsProcessingModalVisible(true);
        const base64 = await getBase64(capturedImageUri);
        const payload = {
          image: base64,
        };
        await fetch(
          "https://276weygzmg.execute-api.ap-south-1.amazonaws.com/prod/quick_scan",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            const body = JSON.parse(data.body);
            console.log(body.class);
            setLabel(body.class);
            setImageUri(capturedImageUri);
            setIsProcessingModalVisible(false);
            setIsScanModalVisible(true);
          })
          .catch((error) => {
            setIsProcessingModalVisible(false);
            console.error("Error:", error);
          });
      }
    } else {
      Alert.alert("No image captured", "Please try again.");
    }
  };

  const [searchText, setSearchText] = useState("");

  const filteredScans = scans.filter((scan) =>
    scan.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar backgroundColor="white" />

        <View style={styles.container}>
          <Text style={styles.title}>Krushify</Text>
          <ScanButton
            title="Scan using Drone"
            onPress={() => setShowInputModal(true)}
          />

          <ScanButton title="Quick Scan" onPress={pickImage} />
          <SearchBar searchText={searchText} onChangeText={setSearchText} />

          {loading ? (
            <SkeletonLoader />
          ) : filteredScans.length === 0 ? (
            <View style={styles.noScansContainer}>
              <Text style={styles.noScansText}>No scans available</Text>
            </View>
          ) : (
            <ScanList scans={filteredScans} />
          )}

          <Modal visible={showInputModal} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalBackdrop}>
                <View style={styles.inputModal}>
                  <Text style={styles.modalTitle}>Start a Drone Scan</Text>
                  <Text style={styles.modalLabel}>Enter Scan ID:</Text>
                  <TextInput
                    value={scanId}
                    onChangeText={setScanId}
                    placeholder="Scan ID"
                    style={styles.modalInput}
                    placeholderTextColor="#aaa"
                  />
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.primaryButton}
                      onPress={handleStartScan}
                    >
                      <Text style={styles.primaryButtonText}>Start</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.secondaryButton}
                      onPress={() => setShowInputModal(false)}
                    >
                      <Text style={styles.secondaryButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <Modal visible={showLoadingModal} transparent animationType="fade">
            <View style={styles.modalBackdrop}>
              <View style={styles.inputModal}>
                <ActivityIndicator
                  size="large"
                  color="#1e3a8a"
                  style={{ marginVertical: 20 }}
                />
                <Text style={styles.modalTitle}>Scanning in Progress</Text>
                <TouchableOpacity
                  style={styles.stopButton}
                  onPress={handleStopScan}
                >
                  <Text style={styles.stopButtonText}>Stop</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            visible={isProcessingModalVisible}
            transparent
            animationType="fade"
          >
            <View style={styles.processingModalOverlay}>
              <View style={styles.processingModalContainer}>
                <ActivityIndicator size="large" color="#111827" />
                <Text style={styles.processingModalText}>
                  Predicting the label...
                </Text>
              </View>
            </View>
          </Modal>

          <Modal
            visible={isScanModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setIsScanModalVisible(false)}
          >
            <View style={styles.scanModalBackground}>
              <View style={styles.scanModalContainer}>
                <Text style={styles.scanModalText}>Disease : {label}</Text>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <Button
                  title="Close"
                  onPress={() => setIsScanModalVisible(false)}
                />
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white",
    flex: 1,
  },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  inputModal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  modalLabel: {
    alignSelf: "flex-start",
    fontSize: 14,
    marginBottom: 6,
    color: "#444",
  },

  modalInput: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  primaryButton: {
    flex: 1,
    backgroundColor: "#101826",
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 8,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    paddingVertical: 12,
    borderRadius: 10,
    marginLeft: 8,
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "black",
    fontWeight: "600",
  },
  stopButton: {
    backgroundColor: "#b91c1c",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },

  stopButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  noScansContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noScansText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
  scanModalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scanModalContainer: {
    width: 350,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  scanModalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  processingModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  processingModalContainer: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 20,
    width: "75%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 10,
  },
  processingModalText: {
    marginTop: 15,
    fontSize: 16,
    color: "#111827",
    fontWeight: "600",
  },
});

export default HomeScreen;
