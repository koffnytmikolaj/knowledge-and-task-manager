import type { Task } from "domain/task/Task";
import type { TaskRepository } from "./TaskRepository";

export function getTask(
  id: string,
  repository: TaskRepository,
): Promise<Task | null> {
  return repository.findById(id);
}
