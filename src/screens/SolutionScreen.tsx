// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const results = [
//   {
//     id: 1,
//     title: "Use of natural predators",
//     description:
//       "Introducing ladybugs can help control aphids and other pests in crops.",
//   },
//   {
//     id: 2,
//     title: "Crop rotation",
//     description:
//       "Rotating crops can break the lifecycle of pathogens and reduce the spread of diseases.",
//   },
//   {
//     id: 3,
//     title: "Use of natural predators",
//     description:
//       "Introducing ladybugs can help control aphids and other pests in crops.",
//   },
//   {
//     id: 4,
//     title: "Crop rotation",
//     description:
//       "Rotating crops can break the lifecycle of pathogens and reduce the spread of diseases.",
//   },
// ];

// const featuredProducts = [
//   {
//     id: 1,
//     tag: "New Arrival",
//     name: "Organic Mango Seeds",
//     type: "Golden Mangoes",
//     price: "$10",
//   },
//   {
//     id: 2,
//     tag: "Bestseller",
//     name: "Nutrient-Rich Fertilizer",
//     type: "Mango Boost",
//     price: "$15",
//   },
// ];

// const SolutionScreen = () => {
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
//       <ScrollView style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Solutions</Text>
//         </View>

//         {/* Relevant Results */}
//         <Text style={styles.sectionTitle}>Relevant Results</Text>
//         {results.map((item) => (
//           <View key={item.id} style={styles.resultCard}>
//             <View style={styles.resultImage} />
//             <View style={styles.resultText}>
//               <Text style={styles.resultTitle}>{item.title}</Text>
//               <Text style={styles.resultDescription}>{item.description}</Text>
//             </View>
//           </View>
//         ))}

//         {/* Featured Products */}
//         <Text style={styles.sectionTitle}>Featured Products</Text>
//         <View style={styles.productContainer}>
//           {featuredProducts.map((product) => (
//             <View key={product.id} style={styles.productCard}>
//               <Text style={styles.productTag}>{product.tag}</Text>
//               <Text style={styles.productName}>{product.name}</Text>
//               <Text style={styles.productType}>{product.type}</Text>
//               <Text style={styles.productPrice}>Price: {product.price}</Text>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: "#fff" },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 15,
//   },

//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//   },
//   sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },

//   // Result Cards
//   resultCard: {
//     flexDirection: "row",
//     backgroundColor: "#F8F8F8",
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 8,
//     alignItems: "center",
//   },
//   resultImage: {
//     width: 40,
//     height: 40,
//     backgroundColor: "#ccc",
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   resultText: { flex: 1 },
//   resultTitle: { fontSize: 14, fontWeight: "bold" },
//   resultDescription: { fontSize: 12, color: "gray" },

//   // Product Cards
//   productContainer: { flexDirection: "row", justifyContent: "space-between" },
//   productCard: {
//     width: "48%",
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   productTag: {
//     fontSize: 10,
//     fontWeight: "bold",
//     backgroundColor: "#eee",
//     padding: 3,
//     borderRadius: 5,
//     textAlign: "center",
//     marginBottom: 5,
//   },
//   productName: { fontSize: 14, fontWeight: "bold" },
//   productType: { fontSize: 12, color: "gray" },
//   productPrice: { fontSize: 14, fontWeight: "bold", marginTop: 5 },
// });

// export default SolutionScreen;
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SolutionCard from "../components/SolutionCard";
import useDiseasesData from "../hooks/useDiseasesSolutions";

const classLabels = [
  "All",
  "Anthracnose",
  "Bacterial Canker",
  "Cutting Weevil",
  "Die Back",
  "Gall Midge",
  "Powdery Mildew",
  "Sooty Mould",
];

type DiseaseInfo = {
  disease: string;
  symptoms: string;
  causes: string;
  solutions: string[];
  recommended_products: string[];
  source: string;
};

export default function SolutionsScreen() {
  const [selectedDisease, setSelectedDisease] = useState<string>("All");
  const filteredDiseaseData = useDiseasesData(selectedDisease);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={styles.container}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View
          style={{
            backgroundColor: "white",
            paddingBottom: 10,
            paddingTop: 16,
          }}
        >
          <Text style={styles.header}>Solutions</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            {classLabels.map((disease, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedDisease(disease)}
                style={[
                  styles.filterChip,
                  selectedDisease === disease && styles.filterChipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedDisease === disease && styles.filterTextSelected,
                  ]}
                >
                  {disease}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {filteredDiseaseData.length === 0 ? (
          <Text
            style={{
              textAlign: "center",
              marginTop: 40,
              color: "#999",
              fontSize: 16,
            }}
          >
            No solutions found for "{selectedDisease}".
          </Text>
        ) : (
          <>
            <Text style={styles.subHeader}>Relevant Results</Text>
            {filteredDiseaseData.map((item: DiseaseInfo, index: number) => (
              <SolutionCard
                key={index}
                data={item}
                selectedChip={selectedDisease}
              />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterScroll: {
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipSelected: {
    backgroundColor: "#000",
  },
  filterText: {
    fontSize: 14,
    color: "#444",
  },
  filterTextSelected: {
    color: "#fff",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 8,
  },
  solutionCard: {
    backgroundColor: "#f3f3f3",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  solutionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  solutionDesc: {
    fontSize: 13,
    color: "#666",
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: screenWidth / 2 - 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  productLabel: {
    fontSize: 10,
    backgroundColor: "#eee",
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  productDesc: {
    fontSize: 12,
    color: "#777",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2e7d32",
  },
});
