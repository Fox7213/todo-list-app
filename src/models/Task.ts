export enum Priority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  deleted: boolean;
  order: number;
  priority: Priority;
}