export interface NestedData {
  note: string;
  createdAt: string;
}

export interface Title {
  id?: string;
  title: string;
  notes?: NestedData[];
}