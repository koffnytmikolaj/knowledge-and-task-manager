import type { Task } from "domain/task";

export type CreateTaskInput = {
  title: string;
};

export function createTask(input: CreateTaskInput): Task {
  return {
    id: crypto.randomUUID(),
    title: input.title,
    status: "TODO",
    priority: 3,
    createdAt: new Date(),
  };
}
