import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";

const results = [
  { id: 1, title: "Use of natural predators", description: "Introducing ladybugs can help control aphids and other pests in crops." },
  { id: 2, title: "Crop rotation", description: "Rotating crops can break the lifecycle of pathogens and reduce the spread of diseases." },
  { id: 3, title: "Use of natural predators", description: "Introducing ladybugs can help control aphids and other pests in crops." },
  { id: 4, title: "Crop rotation", description: "Rotating crops can break the lifecycle of pathogens and reduce the spread of diseases." },
];

const featuredProducts = [
  { id: 1, tag: "New Arrival", name: "Organic Mango Seeds", type: "Golden Mangoes", price: "$10" },
  { id: 2, tag: "Bestseller", name: "Nutrient-Rich Fertilizer", type: "Mango Boost", price: "$15" },
];

const SolutionScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Solutions</Text>

      {/* Relevant Results */}
      <Text style={styles.sectionTitle}>Relevant Results</Text>
      {results.map((item) => (
        <View key={item.id} style={styles.resultCard}>
          <View style={styles.resultImage} />
          <View style={styles.resultText}>
            <Text style={styles.resultTitle}>{item.title}</Text>
            <Text style={styles.resultDescription}>{item.description}</Text>
          </View>
        </View>
      ))}

      {/* Featured Products */}
      <Text style={styles.sectionTitle}>Featured Products</Text>
      <View style={styles.productContainer}>
        {featuredProducts.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Text style={styles.productTag}>{product.tag}</Text>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productType}>{product.type}</Text>
            <Text style={styles.productPrice}>Price: {product.price}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  
  // Result Cards
  resultCard: { flexDirection: "row", backgroundColor: "#F8F8F8", borderRadius: 10, padding: 10, marginBottom: 8, alignItems: "center" },
  resultImage: { width: 40, height: 40, backgroundColor: "#ccc", borderRadius: 5, marginRight: 10 },
  resultText: { flex: 1 },
  resultTitle: { fontSize: 14, fontWeight: "bold" },
  resultDescription: { fontSize: 12, color: "gray" },

  // Product Cards
  productContainer: { flexDirection: "row", justifyContent: "space-between" },
  productCard: { width: "48%", backgroundColor: "#fff", padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "#ddd" },
  productTag: { fontSize: 10, fontWeight: "bold", backgroundColor: "#eee", padding: 3, borderRadius: 5, textAlign: "center", marginBottom: 5 },
  productName: { fontSize: 14, fontWeight: "bold" },
  productType: { fontSize: 12, color: "gray" },
  productPrice: { fontSize: 14, fontWeight: "bold", marginTop: 5 },
});

export default SolutionScreen;
