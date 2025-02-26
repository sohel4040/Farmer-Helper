import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
        value={searchText}
        onChangeText={onChangeText}
      />
      <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'gray', borderRadius: 8, padding: 5, marginVertical: 10 },
  searchInput: { flex: 1, padding: 8 },
  searchIcon: { marginRight: 10 },
});

export default SearchBar;
