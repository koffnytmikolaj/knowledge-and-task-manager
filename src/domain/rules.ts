import type { TaskStatus } from "./task";

export const Rules = {
  canChangeTaskStatus: (from: TaskStatus, to: TaskStatus) => {
    if (from === "DONE") return false;
    if (from === "TODO" && to === "DONE") return false;

    return true;
  },

  shouldTriggerAIForNote: (content: string) => {
    return content.trim().length > 50;
  },
};