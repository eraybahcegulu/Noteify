export interface NotesData {
  id?: string;
  note: string;
  createdAt: string;
}

export interface Title {
  id?: string;
  title: string;
  notes?: NotesData[];
}