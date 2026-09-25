"use server";

import { createTask, type CreateTaskInput } from "modules/tasks/createTask";
import { updateTaskStatus } from "modules/tasks/updateTaskStatus";
import type { TaskStatus } from "domain/task";

export async function createTaskAction(input: CreateTaskInput) {
  return createTask(input);
}

export async function updateTaskStatusAction(input: {
  current: TaskStatus;
  next: TaskStatus;
}) {
  const status = updateTaskStatus(input.current, input.next);

  return { status };
}
