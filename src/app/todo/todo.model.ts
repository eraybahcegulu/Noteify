export interface Todo {
  title: string;
  completed: boolean;
  createdAt: string | { date: string; time: string };
  id?: string;
}