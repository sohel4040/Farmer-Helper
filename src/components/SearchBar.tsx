import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SearchBarProps = {
  searchText: string;
  onChangeText: (text: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchText, onChangeText }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search scans"
        placeholderTextColor="#6C757D"
        value={searchText}
        onChangeText={onChangeText}
      />
      {searchText.length === 0 ? (
        <Ionicons name="search" size={20} color="gray" style={styles.icon} />
      ) : (
        <TouchableOpacity onPress={() => onChangeText("")}>
          <Ionicons name="close" size={20} color="gray" style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 5,
    marginVertical: 10,
  },
  searchInput: { flex: 1, padding: 8 },
  icon: { marginRight: 10 },
});

export default SearchBar;
