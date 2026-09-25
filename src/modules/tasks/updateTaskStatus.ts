import { Rules } from "domain/rules";
import type { TaskStatus } from "domain/task";

export function updateTaskStatus(
  current: TaskStatus,
  next: TaskStatus,
): TaskStatus {
  if (!Rules.canChangeTaskStatus(current, next)) {
    throw new Error("Invalid status transition");
  }

  return next;
}
