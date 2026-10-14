import type { TaskStatus } from "./Task";

const taskStatuses: readonly TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

export function isTaskStatus(value: unknown): value is TaskStatus {
  return (
    typeof value === "string" &&
    taskStatuses.some((status) => status === value)
  );
}

export function canChangeTaskStatus(
  from: TaskStatus,
  to: TaskStatus,
): boolean {
  if (from === "DONE") return false;
  if (from === "TODO" && to === "DONE") return false;

  return true;
}
