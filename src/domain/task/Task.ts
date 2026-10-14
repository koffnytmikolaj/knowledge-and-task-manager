export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId?: string;
  noteId?: string;
  createdAt: Date;
  updatedAt: Date;
};
