import { useState } from "react";
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type DiseaseInfo = {
  disease?: string;
  symptoms: string;
  causes: string;
  solutions: string[];
  recommended_products: string[];
  source: string;
};

type DiseaseCardProps = {
  data: DiseaseInfo;
  selectedChip: string;
};

export default function DiseaseCard({ data, selectedChip }: DiseaseCardProps) {
  const { disease, symptoms, causes, solutions, recommended_products, source } =
    data;

  return (
    <View style={styles.card}>
      {selectedChip === "All" && (
        <Text style={styles.diseaseTitle}>{data.disease}</Text>
      )}

      <Section title="Symptoms" content={symptoms} selectedChip={selectedChip}/>
      <Section title="Causes" content={causes}/>

      <Section title="Solutions" bullets={solutions}/>

      {/* Show recommended products as chips */}
      <View style={styles.chipsContainer}>
        <Text style={styles.sectionTitle}>Recommended Products</Text>
        <View style={styles.chipsWrapper}>
          {recommended_products.map((product, idx) => (
            <View key={idx} style={styles.chip}>
              <Text style={styles.chipText}>{product}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        onPress={() => Linking.openURL(source)}
        style={styles.viewMoreButton}
      >
        <Text style={styles.viewMoreText}>View More</Text>
      </TouchableOpacity>
    </View>
  );
}

function Section({
  title,
  content,
  bullets,
  selectedChip
}: {
  title: string;
  content?: string;
  bullets?: string[];
  selectedChip?:string,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={{ marginTop: selectedChip === "All" ? 16 : 4 }}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {content && (
        <Text style={styles.sectionText}>
          {expanded ? content : `${content?.slice(0, 100)}...`}
        </Text>
      )}

      {bullets && (
        <>
          {bullets.slice(0, expanded ? undefined : 3).map((item, idx) => (
            <Text key={idx} style={styles.bullet}>
              • {item}
            </Text>
          ))}

          {bullets.length > 3 && (
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <Text style={styles.expandToggle}>
                {expanded ? "Show Less" : "Show More"}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 18,
    marginVertical: 10,
    marginHorizontal: 2,
    backgroundColor: "#f4f4f4",
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
  diseaseTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",

    marginBottom: 6,
  },
  sectionText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
  },
  bullet: {
    fontSize: 14,
    color: "black",
    paddingLeft: 16,
    lineHeight: 22,
  },
  source: {
    fontSize: 16,
    color: "#1E88E5",
    marginTop: 18,
    textDecorationLine: "underline",
  },
  sourceButton: {
    marginTop: 14,
  },
  expandToggle: {
    fontSize: 14,
    color: "#1E88E5",
    marginTop: 8,
    textDecorationLine: "underline",
  },

  chipsContainer: {
    marginTop: 16,
  },
  chipsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  chip: {
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 14,
    color: "#333",
  },

  viewMoreButton: {
    marginTop: 14,
    backgroundColor: "#101826",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  },
  viewMoreText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
