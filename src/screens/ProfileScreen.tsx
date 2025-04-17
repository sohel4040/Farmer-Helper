import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

type User = {
  mob_no: number,
  name: string,
  city:string,
}
export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [userInfo, setUserInfo] = useState<User>()
  const [loading, setLoading] = useState(false);

  const getProfileInfo = async () => {
    const payload = {
      mob_no: Number(user?.mobile),
    };
    setLoading(true);
    await fetch(
      "https://276weygzmg.execute-api.ap-south-1.amazonaws.com/prod/getProfileInfo",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const userData = data.details;
        setUserInfo(userData)
        setLoading(false)
      })
      .catch((error: any) => {
        console.log(error)
        setLoading(false)
        alert("Something went wrong");
        return;
      });
     
  };

  useEffect(() => {
    getProfileInfo()
  }, [])
  
  const handleLogout = async () => {
    await logout();
  };

  const renderValue = (value: string | undefined) => {
    if (loading) {
      return <View style={styles.skeleton} />;
    }
    return <Text style={styles.value}>{value || 'Not available'}</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farmer Profile</Text>

      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle-outline" size={100} color="#101826" />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Name</Text>
          {renderValue(userInfo?.name)}
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Mobile Number</Text>
          {renderValue(userInfo?.mob_no.toString())}
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>City</Text>
          {renderValue(userInfo?.city)}
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#101826",
    marginBottom: 12,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f1f5f9",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
    textAlign: "center",
  },
  infoRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: "#1f2937",
    fontWeight: "600",
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: "#101826",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  skeleton: {
    width: 100,
    height: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
  },
});
