"use server";

import type { Task as DbTask } from "@prisma/client";
import type { TaskStatus } from "domain/task";
import { db } from "infrastructure/db/prisma";
import { updateTaskStatus } from "modules/tasks/updateTaskStatus";

type CreateTaskActionInput = {
  title: string;
};

export async function createTaskAction(
  input: CreateTaskActionInput,
): Promise<DbTask> {
  return db.task.create({
    data: {
      title: input.title,
      status: "TODO",
      priority: 3,
    },
  });
}

export async function updateTaskStatusAction(input: {
  current: TaskStatus;
  next: TaskStatus;
}) {
  const status = updateTaskStatus(input.current, input.next);

  return { status };
}
