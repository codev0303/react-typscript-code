export interface HTTPUser {
  id: number;
  name: string;
}

export interface HTTPTodos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
