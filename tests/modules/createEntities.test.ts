import { describe, expect, it } from "vitest";
import { createNote } from "modules/notes/createNote";
import { createTask } from "modules/tasks/createTask";

describe("createNote", () => {
  it("creates a note with a normalized title and timestamps", () => {
    const result = createNote({
      title: "  Project notes  ",
      content: "Short content",
    });

    expect(result.note.title).toBe("Project notes");
    expect(result.note.id).toBeTruthy();
    expect(result.note.createdAt).toBeInstanceOf(Date);
    expect(result.note.updatedAt).toEqual(result.note.createdAt);
    expect(result.aiTriggered).toBe(false);
  });

  it("triggers analysis for sufficiently long content", () => {
    const result = createNote({
      title: "Project notes",
      content: "a".repeat(51),
    });

    expect(result.aiTriggered).toBe(true);
  });

  it("rejects an invalid title", () => {
    expect(() =>
      createNote({
        title: "   ",
        content: "Content",
      }),
    ).toThrow();
  });
});

describe("createTask", () => {
  it("creates a task with default status and priority", () => {
    const task = createTask({ title: "  Prepare release  " });

    expect(task.title).toBe("Prepare release");
    expect(task.status).toBe("TODO");
    expect(task.priority).toBe("MEDIUM");
    expect(task.id).toBeTruthy();
    expect(task.createdAt).toBeInstanceOf(Date);
    expect(task.updatedAt).toEqual(task.createdAt);
  });

  it("rejects an invalid title", () => {
    expect(() => createTask({ title: "" })).toThrow();
  });
});
