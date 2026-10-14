import type { Task as PrismaTask, PrismaClient } from "@prisma/client";
import type { Task } from "domain/task/Task";
import type { NewTask, TaskRepository } from "modules/tasks/TaskRepository";
import { prisma } from "../db/client";

function toDomainTask(record: PrismaTask): Task {
  return {
    id: record.id,
    title: record.title,
    status: record.status,
    priority: record.priority,
    ...(record.projectId === null ? {} : { projectId: record.projectId }),
    ...(record.noteId === null ? {} : { noteId: record.noteId }),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

export class PrismaTaskRepository implements TaskRepository {
  constructor(
    private readonly client: Pick<PrismaClient, "task"> = prisma,
  ) {}

  async create(task: NewTask): Promise<Task> {
    const record = await this.client.task.create({
      data: {
        title: task.title,
        status: task.status,
        priority: task.priority,
        ...(task.projectId === undefined ? {} : { projectId: task.projectId }),
        ...(task.noteId === undefined ? {} : { noteId: task.noteId }),
      },
    });

    return toDomainTask(record);
  }

  async findById(id: string): Promise<Task | null> {
    const record = await this.client.task.findUnique({ where: { id } });
    return record === null ? null : toDomainTask(record);
  }

  async findAll(): Promise<Task[]> {
    const records = await this.client.task.findMany({
      orderBy: { createdAt: "desc" },
    });
    return records.map(toDomainTask);
  }
}
