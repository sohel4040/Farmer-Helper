import React from "react";
import { FlatList } from "react-native";
import ScanItem from "./ScanItem";

type Scan = {
  id: string;
  name: string;
  location: string;
  date: string;
  status: "success" | "error" | "default";
};

type ScanListProps = {
  scans: Scan[];
};

const ScanList: React.FC<ScanListProps> = ({ scans }) => {
  return (
    <FlatList
      data={scans}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ScanItem {...item} />}
    />
  );
};

export default ScanList;
