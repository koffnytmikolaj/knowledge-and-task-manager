import type { Task } from "domain/task/Task";
import { normalizeTaskTitle } from "domain/task/TaskRules";

export type CreateTaskInput = {
  title: string;
};

export function createTask(input: CreateTaskInput): Task {
  const title = normalizeTaskTitle(input.title);
  const now = new Date();

  return {
    id: crypto.randomUUID(),
    title,
    status: "TODO",
    priority: "MEDIUM",
    createdAt: now,
    updatedAt: now,
  };
}
