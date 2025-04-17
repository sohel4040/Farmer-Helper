import { useMemo } from "react";
import diseaseData from "../../assets/large_mango_disease_dataset.json";

type DiseaseInfo = {
  disease: string;
  symptoms: string;
  causes: string;
  solutions: string[];
  recommended_products: string[];
  source: string;
};

export default function useDiseasesSolutions(selectedDisease: string): DiseaseInfo[] {
  return useMemo(() => {
    if (selectedDisease === "All") return diseaseData;
    return diseaseData.filter(
      (item: DiseaseInfo) => item.disease.toLowerCase() === selectedDisease.toLowerCase()
    );
  }, [selectedDisease]);
}
