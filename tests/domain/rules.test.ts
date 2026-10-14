import { describe, expect, it } from "vitest";
import { Rules } from "domain/rules";

describe("Rules.shouldTriggerAIForNote", () => {
  it("does not trigger AI for 50 characters", () => {
    expect(Rules.shouldTriggerAIForNote("a".repeat(50))).toBe(false);
  });

  it("triggers AI for 51 characters", () => {
    expect(Rules.shouldTriggerAIForNote("a".repeat(51))).toBe(true);
  });

  it("uses trimmed content length", () => {
    expect(Rules.shouldTriggerAIForNote("   " + "a".repeat(50) + "   ")).toBe(
      false,
    );
  });

  it("does not trigger AI for empty content", () => {
    expect(Rules.shouldTriggerAIForNote("")).toBe(false);
  });

  it("does not trigger AI for whitespace-only content", () => {
    expect(Rules.shouldTriggerAIForNote("     ")).toBe(false);
  });
});
