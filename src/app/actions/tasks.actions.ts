"use server";

import type { Task } from "domain/task/Task";
import type { TaskStatus } from "domain/task/Task";
import { PrismaTaskRepository } from "infrastructure/repositories/PrismaTaskRepository";
import { createTask } from "modules/tasks/createTask";
import { updateTaskStatus } from "modules/tasks/updateTaskStatus";

const taskRepository = new PrismaTaskRepository();

type CreateTaskActionInput = {
  title: string;
  projectId?: string;
  noteId?: string;
};

export async function createTaskAction(
  input: CreateTaskActionInput,
): Promise<Task> {
  return createTask(input, taskRepository);
}

export async function updateTaskStatusAction(input: {
  current: TaskStatus;
  next: TaskStatus;
}) {
  const status = updateTaskStatus(input.current, input.next);

  return { status };
}
