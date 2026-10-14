import { describe, expect, it } from "vitest";
import {
  canChangeTaskStatus,
  isTaskStatus,
  normalizeTaskTitle,
} from "domain/task/TaskRules";

describe("normalizeTaskTitle", () => {
  it("trims whitespace around the title", () => {
    expect(normalizeTaskTitle("  Prepare report  ")).toBe("Prepare report");
  });

  it("rejects an empty title", () => {
    expect(() => normalizeTaskTitle("")).toThrow();
  });

  it("rejects a title containing only whitespace", () => {
    expect(() => normalizeTaskTitle("   ")).toThrow();
  });

  it("accepts a title with 200 characters", () => {
    expect(normalizeTaskTitle("a".repeat(200))).toHaveLength(200);
  });

  it("rejects a title longer than 200 characters", () => {
    expect(() => normalizeTaskTitle("a".repeat(201))).toThrow();
  });
});

describe("isTaskStatus", () => {
  it.each(["TODO", "IN_PROGRESS", "DONE"])(
    "accepts the status %s",
    (status) => {
      expect(isTaskStatus(status)).toBe(true);
    },
  );

  it.each(["todo", "INVALID", "", null, 123, undefined])(
    "rejects the invalid status %s",
    (status) => {
      expect(isTaskStatus(status)).toBe(false);
    },
  );
});

describe("canChangeTaskStatus", () => {
  it("allows TODO to IN_PROGRESS", () => {
    expect(canChangeTaskStatus("TODO", "IN_PROGRESS")).toBe(true);
  });

  it("does not allow TODO to DONE directly", () => {
    expect(canChangeTaskStatus("TODO", "DONE")).toBe(false);
  });

  it("allows IN_PROGRESS to DONE", () => {
    expect(canChangeTaskStatus("IN_PROGRESS", "DONE")).toBe(true);
  });

  it("does not allow changes from DONE", () => {
    expect(canChangeTaskStatus("DONE", "TODO")).toBe(false);
    expect(canChangeTaskStatus("DONE", "IN_PROGRESS")).toBe(false);
    expect(canChangeTaskStatus("DONE", "DONE")).toBe(false);
  });
});
