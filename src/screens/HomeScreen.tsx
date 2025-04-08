import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ScanButton from "../components/ScanButton";
import SearchBar from "../components/SearchBar";
import ScanList from "../components/ScanList";
import { Scan } from "../types"; // ✅ Import the Scan type

const scans: Scan[] = [
  {
    id: "1",
    name: "Scan #1",
    location: "Mumbai, Maharashtra",
    date: "02 Feb",
    status: "success" as const,
  },
  {
    id: "2",
    name: "Scan #2",
    location: "Mumbai, Maharashtra",
    date: "02 Feb",
    status: "error" as const,
  },
  {
    id: "3",
    name: "Scan #3",
    location: "Mumbai, Maharashtra",
    date: "02 Feb",
    status: "default" as const,
  },
  {
    id: "4",
    name: "Scan #4",
    location: "Mumbai, Maharashtra",
    date: "02 Feb",
    status: "default" as const,
  },
];

const HomeScreen: React.FC = () => {
  const [showInputModal, setShowInputModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [scanId, setScanId] = useState("");
  const [progress, setProgress] = useState(0);
  const handleStartScan = () => {
    setShowInputModal(false);
    setProgress(0);
    setShowLoadingModal(true);

    // Simulate loading progress
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

  const handleStopScan = () => {
    setShowLoadingModal(false);
    setProgress(0);
  };

  const [searchText, setSearchText] = useState("");

  const filteredScans = scans.filter((scan) =>
    scan.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Krushify</Text>
      {/* <ScanButton title="Scan using Drone" /> */}
      <ScanButton
        title="Scan using Drone"
        onPress={() => setShowInputModal(true)}
      />
      <ScanButton title="Quick Scan" />
      <SearchBar searchText={searchText} onChangeText={setSearchText} />
      <ScanList scans={filteredScans} />

      <Modal visible={showInputModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.inputModal}>
            <Text style={styles.modalTitle}>Start a Drone Scan</Text>
            <Text style={styles.modalLabel}>Enter Scan ID:</Text>
            <TextInput
              value={scanId}
              onChangeText={setScanId}
              placeholder="e.g. Scan_23"
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "white", flex: 1 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },

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
});

export default HomeScreen;
