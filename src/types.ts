export type Scan = {
    scan_id: string;
    name: string;
    location: string;
    date: string;
    status: 'success' | 'error' | 'default';
  };
  
export type ScanHeader = {
  healthyCount: number;
  nonHealthyCount: number;
  percentageLeavesAffected: number;
}

export type ImageRecord = {
  image_url: string;
  img_timestamp: string;
  label: string;
  latitude:string;
  longitude:string;
  mob_no:string;
  scan_id:string;
};

