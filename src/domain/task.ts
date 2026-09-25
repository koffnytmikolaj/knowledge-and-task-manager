export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: number;
  noteId?: string;
  createdAt: Date;
};