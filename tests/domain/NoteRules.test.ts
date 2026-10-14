import { describe, expect, it } from "vitest";
import { normalizeNoteTitle } from "domain/note/NoteRules";

describe("normalizeNoteTitle", () => {
  it("trims whitespace around the title", () => {
    expect(normalizeNoteTitle("  Project notes  ")).toBe("Project notes");
  });

  it("rejects an empty title", () => {
    expect(() => normalizeNoteTitle("")).toThrow();
  });

  it("rejects a title containing only whitespace", () => {
    expect(() => normalizeNoteTitle("   ")).toThrow();
  });

  it("accepts a title with 200 characters", () => {
    expect(normalizeNoteTitle("a".repeat(200))).toHaveLength(200);
  });

  it("rejects a title longer than 200 characters", () => {
    expect(() => normalizeNoteTitle("a".repeat(201))).toThrow();
  });
});
