import type { Task } from "domain/task/Task";

export type CreateTaskInput = {
  title: string;
};

export function createTask(input: CreateTaskInput): Task {
  return {
    id: crypto.randomUUID(),
    title: input.title,
    status: "TODO",
    priority: "MEDIUM",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
