import { prisma } from "./client";

export const db = {
  note: prisma.note,
  task: prisma.task,
  project: prisma.project,
};
