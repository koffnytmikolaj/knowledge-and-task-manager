import type { Task } from "domain/task/Task";

export type NewTask = Pick<Task, "title" | "status" | "priority"> &
  Partial<Pick<Task, "projectId" | "noteId">>;

export interface TaskRepository {
  create(task: NewTask): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findAll(): Promise<Task[]>;
}
