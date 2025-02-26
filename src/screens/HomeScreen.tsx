import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScanButton from '../components/ScanButton';
import SearchBar from '../components/SearchBar';
import ScanList from '../components/ScanList';
import { Scan } from '../types';  // ✅ Import the Scan type


const scans: Scan[] = [
    { id: '1', name: 'Scan #1', location: 'Mumbai, Maharashtra', date: '02 Feb', status: 'success' as const },
    { id: '2', name: 'Scan #2', location: 'Mumbai, Maharashtra', date: '02 Feb', status: 'error' as const },
    { id: '3', name: 'Scan #3', location: 'Mumbai, Maharashtra', date: '02 Feb', status: 'default' as const },
    { id: '4', name: 'Scan #4', location: 'Mumbai, Maharashtra', date: '02 Feb', status: 'default' as const },
  ];
  

const HomeScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  const filteredScans = scans.filter(scan => scan.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Krushify</Text>
      <ScanButton title="Scan using Drone" />
      <ScanButton title="Quick Scan" />
      <SearchBar searchText={searchText} onChangeText={setSearchText} />
      <ScanList scans={filteredScans} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: 'white', flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});

export default HomeScreen;
