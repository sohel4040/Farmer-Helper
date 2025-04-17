import { useAuth } from "@/context/AuthContext";
import { encryptPassword } from "@/crypt/crypt.helper";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const AuthScreen = () => {
  const { login } = useAuth();
  const router = useRouter();
  const { user } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const handleAuth = async () => {
    // print(encryptPassword())
    if (mobile.length !== 10) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }

    if (mode === "login") {
      if (!mobile || !password) {
        alert("Please enter all required fields");
        return;
      }
      const payload = {
        mob_no: Number(mobile),
        password: password,
      };
      await fetch(
        "https://276weygzmg.execute-api.ap-south-1.amazonaws.com/prod/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.body === "true") {
            login({
              mobile,
              password,
              city: city,
              name: name,
            });
          }
          else {
            alert("User does not exist");
            return
          }
        })
        .catch((error) => {
          alert("Something went wrong");
          return
        });
    } else {
      if (!mobile || !password || !city || !name) {
        alert("Please enter all required fields");
        return;
      }
      const payload = {
        mob_no: Number(mobile),
        password: password,
        city: city,
        name: name,
      };

      await fetch(
        "https://276weygzmg.execute-api.ap-south-1.amazonaws.com/prod/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          login({
            mobile,
            password,
            city: city,
            name: name,
          });
        })
        .catch((error) => {
          alert("Something went wrong");
        });
    }
  };

  useEffect(() => {
    if (user) {
      router.replace("/(tabs)");
    }
  }, [user]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Krushify</Text>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              mode === "login" && styles.activeToggle,
            ]}
            onPress={() => setMode("login")}
          >
            <Text
              style={[
                styles.toggleText,
                mode === "login" && styles.activeToggleText,
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              mode === "register" && styles.activeToggle,
            ]}
            onPress={() => setMode("register")}
          >
            <Text
              style={[
                styles.toggleText,
                mode === "register" && styles.activeToggleText,
              ]}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formCard}>
          {mode === "register" && (
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
            />
          )}
          <TextInput
            placeholder="Mobile Number"
            style={styles.input}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="numeric"
            maxLength={10}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#999"
          />
          {mode == "register" && (
            <TextInput
              placeholder="City"
              style={styles.input}
              value={city}
              onChangeText={setCity}
              placeholderTextColor="#999"
            />
          )}
          <TouchableOpacity style={styles.primaryButton} onPress={handleAuth}>
            <Text style={styles.primaryButtonText}>
              {mode === "login" ? "Login" : "Register"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={styles.switchText}
          onPress={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login"
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </Text>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center", // vertical center
    paddingHorizontal: 20, // ⬅️ padding on left and right
    paddingVertical: 10, // optional: top and bottom
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    alignSelf: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    marginBottom: 20,
    marginHorizontal: 30,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
  },
  activeToggle: {
    backgroundColor: "#101826",
  },
  toggleText: {
    fontSize: 16,
    color: "#444",
    fontWeight: "500",
  },
  activeToggleText: {
    color: "#fff",
    fontWeight: "bold",
  },
  formCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#000",
  },
  primaryButton: {
    backgroundColor: "#101826",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchText: {
    marginTop: 20,
    textAlign: "center",
    color: "#1e3a8a",
    fontWeight: "500",
  },
});

export default AuthScreen;
