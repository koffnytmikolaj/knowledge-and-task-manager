import type { Task } from "domain/task/Task";
import { normalizeTaskTitle } from "domain/task/TaskRules";
import type { TaskRepository } from "./TaskRepository";

export type CreateTaskInput = {
  title: string;
  projectId?: string;
  noteId?: string;
};

export async function createTask(
  input: CreateTaskInput,
  repository: TaskRepository,
): Promise<Task> {
  const title = normalizeTaskTitle(input.title);

  return repository.create({
    title,
    status: "TODO",
    priority: "MEDIUM",
    ...(input.projectId === undefined ? {} : { projectId: input.projectId }),
    ...(input.noteId === undefined ? {} : { noteId: input.noteId }),
  });
}
