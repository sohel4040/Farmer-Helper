import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type ScanButtonProps = {
  title: string;
  onPress?: () => void;
};

const ScanButton: React.FC<ScanButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#101826",
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});

export default ScanButton;
