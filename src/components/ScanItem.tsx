import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ScanItemProps = {
  name: string;
  location: string;
  date: string;
  status: 'success' | 'error' | 'default';
};

const ScanItem: React.FC<ScanItemProps> = ({ name, location, date, status }) => {
  return (
    <View style={styles.scanCard}>
      <View>
        <Text style={[styles.scanTitle, styles[status]]}>{name}</Text>
        <Text style={styles.scanLocation}>{location}</Text>
      </View>
      <Text style={styles.scanDate}>{date}</Text>
      <TouchableOpacity style={styles.arrowButton}>
        <Ionicons name="chevron-forward" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scanCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 10, borderRadius: 10, marginVertical: 5 },
  scanTitle: { fontSize: 16, fontWeight: 'bold' },
  scanLocation: { color: 'gray' },
  scanDate: { marginLeft: 'auto', marginRight: 10 },
  arrowButton: { backgroundColor: 'lightgray', borderRadius: 20, padding: 5 },
  success: { color: 'green' },
  error: { color: 'red' },
  default: { color: 'black' },
});

export default ScanItem;

