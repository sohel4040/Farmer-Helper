export type Scan = {
    id: string;
    name: string;
    location: string;
    date: string;
    status: 'success' | 'error' | 'default';
  };
  