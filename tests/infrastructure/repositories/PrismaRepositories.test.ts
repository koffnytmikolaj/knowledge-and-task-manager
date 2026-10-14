import type { Note as PrismaNote, PrismaClient, Task as PrismaTask } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";
import type { Note } from "domain/note/Note";
import type { Task } from "domain/task/Task";
import { PrismaNoteRepository } from "../../../src/infrastructure/repositories/PrismaNoteRepository";
import { PrismaTaskRepository } from "../../../src/infrastructure/repositories/PrismaTaskRepository";

vi.mock("../../../src/infrastructure/db/client", () => ({ prisma: {} }));

const noteProjectId = "00000000-0000-4000-8000-000000000001";
const taskNoteId = "00000000-0000-4000-8000-000000000002";

function noteRecord(overrides: Partial<PrismaNote> = {}): PrismaNote {
  const now = new Date("2026-10-14T12:00:00.000Z");

  return {
    id: "00000000-0000-4000-8000-000000000003",
    title: "Project notes",
    content: "Note content",
    projectId: null,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

function taskRecord(overrides: Partial<PrismaTask> = {}): PrismaTask {
  const now = new Date("2026-10-14T12:00:00.000Z");

  return {
    id: "00000000-0000-4000-8000-000000000004",
    title: "Prepare release",
    status: "TODO",
    priority: "MEDIUM",
    projectId: null,
    noteId: null,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

function makeNoteClient(initialRecords: PrismaNote[] = []) {
  const records = [...initialRecords];
  const note = {
    create: vi.fn(async ({ data }: { data: Partial<PrismaNote> }) => {
      const record = noteRecord(data);
      records.push(record);
      return record;
    }),
    findUnique: vi.fn(async ({ where }: { where: { id: string } }) => {
      return records.find((record) => record.id === where.id) ?? null;
    }),
    findMany: vi.fn(async () => [...records]),
  };

  return {
    client: { note } as unknown as Pick<PrismaClient, "note">,
    note,
  };
}

function makeTaskClient(initialRecords: PrismaTask[] = []) {
  const records = [...initialRecords];
  const task = {
    create: vi.fn(async ({ data }: { data: Partial<PrismaTask> }) => {
      const record = taskRecord(data);
      records.push(record);
      return record;
    }),
    findUnique: vi.fn(async ({ where }: { where: { id: string } }) => {
      return records.find((record) => record.id === where.id) ?? null;
    }),
    findMany: vi.fn(async () => [...records]),
  };

  return {
    client: { task } as unknown as Pick<PrismaClient, "task">,
    task,
  };
}

describe("PrismaNoteRepository", () => {
  it("creates, retrieves, and lists notes with nullable IDs and dates mapped", async () => {
    const stored = noteRecord({ projectId: noteProjectId });
    const { client, note } = makeNoteClient([stored]);
    const repository = new PrismaNoteRepository(client);

    const created = await repository.create({
      title: "Project notes",
      content: "Note content",
      projectId: noteProjectId,
    });
    const found = await repository.findById(stored.id);
    const missing = await repository.findById("missing-id");
    const all = await repository.findAll();

    expect(note.create).toHaveBeenCalledWith({
      data: {
        title: "Project notes",
        content: "Note content",
        projectId: noteProjectId,
      },
    });
    expect(created.projectId).toBe(noteProjectId);
    expect(created.createdAt).toBeInstanceOf(Date);
    expect(found).toMatchObject<Partial<Note>>({
      id: stored.id,
      title: stored.title,
      content: stored.content,
      projectId: noteProjectId,
    });
    expect(found?.createdAt).toEqual(stored.createdAt);
    expect(missing).toBeNull();
    expect(all).toHaveLength(2);
    expect(note.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: "desc" },
    });
  });

  it("omits absent optional project IDs from writes and domain results", async () => {
    const { client } = makeNoteClient();
    const repository = new PrismaNoteRepository(client);

    const created = await repository.create({
      title: "Project notes",
      content: "Note content",
    });

    expect(created.projectId).toBeUndefined();
  });
});

describe("PrismaTaskRepository", () => {
  it("creates, retrieves, and lists tasks with nullable IDs and dates mapped", async () => {
    const stored = taskRecord({ projectId: noteProjectId, noteId: taskNoteId });
    const { client, task } = makeTaskClient([stored]);
    const repository = new PrismaTaskRepository(client);

    const created = await repository.create({
      title: "Prepare release",
      status: "TODO",
      priority: "MEDIUM",
      projectId: noteProjectId,
      noteId: taskNoteId,
    });
    const found = await repository.findById(stored.id);
    const missing = await repository.findById("missing-id");
    const all = await repository.findAll();

    expect(task.create).toHaveBeenCalledWith({
      data: {
        title: "Prepare release",
        status: "TODO",
        priority: "MEDIUM",
        projectId: noteProjectId,
        noteId: taskNoteId,
      },
    });
    expect(created).toMatchObject<Partial<Task>>({
      projectId: noteProjectId,
      noteId: taskNoteId,
      status: "TODO",
      priority: "MEDIUM",
    });
    expect(created.createdAt).toBeInstanceOf(Date);
    expect(found?.createdAt).toEqual(stored.createdAt);
    expect(missing).toBeNull();
    expect(all).toHaveLength(2);
    expect(task.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: "desc" },
    });
  });

  it("omits absent optional relation IDs from writes and domain results", async () => {
    const { client, task } = makeTaskClient();
    const repository = new PrismaTaskRepository(client);

    const created = await repository.create({
      title: "Prepare release",
      status: "TODO",
      priority: "MEDIUM",
    });

    expect(task.create).toHaveBeenCalledWith({
      data: {
        title: "Prepare release",
        status: "TODO",
        priority: "MEDIUM",
      },
    });
    expect(created.projectId).toBeUndefined();
    expect(created.noteId).toBeUndefined();
  });
});
