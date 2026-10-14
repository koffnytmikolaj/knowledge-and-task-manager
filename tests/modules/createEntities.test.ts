import { describe, expect, it, vi } from "vitest";
import type { Note } from "domain/note/Note";
import type { Task } from "domain/task/Task";
import type { NoteRepository } from "modules/notes/NoteRepository";
import { createNote } from "modules/notes/createNote";
import { getNote } from "modules/notes/getNote";
import type { TaskRepository } from "modules/tasks/TaskRepository";
import { createTask } from "modules/tasks/createTask";
import { getTask } from "modules/tasks/getTask";

function makeNote(overrides: Partial<Note> = {}): Note {
  const now = new Date("2026-10-14T12:00:00.000Z");

  return {
    id: "note-id",
    title: "Project notes",
    content: "Short content",
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

function makeTask(overrides: Partial<Task> = {}): Task {
  const now = new Date("2026-10-14T12:00:00.000Z");

  return {
    id: "task-id",
    title: "Prepare release",
    status: "TODO",
    priority: "MEDIUM",
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

describe("createNote", () => {
  it("validates and persists a note with a normalized title", async () => {
    const note = makeNote();
    const repository: NoteRepository = {
      create: vi.fn(async () => note),
      findById: vi.fn(async () => null),
      findAll: vi.fn(async () => []),
    };

    const result = await createNote(
      {
        title: "  Project notes  ",
        content: "Short content",
        projectId: "project-id",
      },
      repository,
    );

    expect(repository.create).toHaveBeenCalledWith({
      title: "Project notes",
      content: "Short content",
      projectId: "project-id",
    });
    expect(result.note).toBe(note);
    expect(result.aiTriggered).toBe(false);
  });

  it("triggers analysis for sufficiently long content", async () => {
    const repository: NoteRepository = {
      create: vi.fn(async () => makeNote({ content: "a".repeat(51) })),
      findById: vi.fn(async () => null),
      findAll: vi.fn(async () => []),
    };

    const result = await createNote(
      { title: "Project notes", content: "a".repeat(51) },
      repository,
    );

    expect(result.aiTriggered).toBe(true);
  });

  it("rejects an invalid title before writing", async () => {
    const repository: NoteRepository = {
      create: vi.fn(async () => makeNote()),
      findById: vi.fn(async () => null),
      findAll: vi.fn(async () => []),
    };

    await expect(
      createNote({ title: "   ", content: "Content" }, repository),
    ).rejects.toThrow();
    expect(repository.create).not.toHaveBeenCalled();
  });

  it("propagates repository errors", async () => {
    const repository: NoteRepository = {
      create: vi.fn(async () => {
        throw new Error("Database unavailable");
      }),
      findById: vi.fn(async () => null),
      findAll: vi.fn(async () => []),
    };

    await expect(
      createNote({ title: "Project notes", content: "Content" }, repository),
    ).rejects.toThrow("Database unavailable");
  });
});

describe("getNote", () => {
  it("returns the repository result, including null for a missing note", async () => {
    const repository: NoteRepository = {
      create: vi.fn(async () => makeNote()),
      findById: vi.fn(async () => null),
      findAll: vi.fn(async () => []),
    };

    await expect(getNote("missing-id", repository)).resolves.toBeNull();
    expect(repository.findById).toHaveBeenCalledWith("missing-id");
  });
});

describe("createTask", () => {
  it("persists a task with its default status and priority", async () => {
    const task = makeTask();
    const repository: TaskRepository = {
      create: vi.fn(async () => task),
      findById: vi.fn(async () => null),
      findAll: vi.fn(async () => []),
    };

    const result = await createTask(
      {
        title: "  Prepare release  ",
        projectId: "project-id",
        noteId: "note-id",
      },
      repository,
    );

    expect(repository.create).toHaveBeenCalledWith({
      title: "Prepare release",
      status: "TODO",
      priority: "MEDIUM",
      projectId: "project-id",
      noteId: "note-id",
    });
    expect(result).toBe(task);
  });

  it("rejects an invalid title before writing", async () => {
    const repository: TaskRepository = {
      create: vi.fn(async () => makeTask()),
      findById: vi.fn(async () => null),
      findAll: vi.fn(async () => []),
    };

    await expect(createTask({ title: "" }, repository)).rejects.toThrow();
    expect(repository.create).not.toHaveBeenCalled();
  });

  it("propagates repository errors", async () => {
    const repository: TaskRepository = {
      create: vi.fn(async () => {
        throw new Error("Database unavailable");
      }),
      findById: vi.fn(async () => null),
      findAll: vi.fn(async () => []),
    };

    await expect(
      createTask({ title: "Prepare release" }, repository),
    ).rejects.toThrow("Database unavailable");
  });
});

describe("getTask", () => {
  it("returns the repository result, including null for a missing task", async () => {
    const repository: TaskRepository = {
      create: vi.fn(async () => makeTask()),
      findById: vi.fn(async () => null),
      findAll: vi.fn(async () => []),
    };

    await expect(getTask("missing-id", repository)).resolves.toBeNull();
    expect(repository.findById).toHaveBeenCalledWith("missing-id");
  });
});
