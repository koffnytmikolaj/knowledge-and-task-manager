import type { TaskStatus } from "./Task";

const taskStatuses: readonly TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];
const MAX_TASK_TITLE_LENGTH = 200;

export function normalizeTaskTitle(title: string): string {
  const normalizedTitle = title.trim();

  if (normalizedTitle.length === 0) {
    throw new Error("Task title cannot be empty");
  }

  if (normalizedTitle.length > MAX_TASK_TITLE_LENGTH) {
    throw new Error(
      `Task title cannot exceed ${MAX_TASK_TITLE_LENGTH} characters`,
    );
  }

  return normalizedTitle;
}

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
