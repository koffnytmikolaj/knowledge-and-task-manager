import { canChangeTaskStatus } from "domain/task/TaskRules";
import type { TaskStatus } from "domain/task/Task";

export function updateTaskStatus(
  current: TaskStatus,
  next: TaskStatus,
): TaskStatus {
  if (!canChangeTaskStatus(current, next)) {
    throw new Error("Invalid status transition");
  }

  return next;
}
