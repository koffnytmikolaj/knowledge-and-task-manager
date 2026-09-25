import { Rules } from "domain/rules";
import type { NoteAnalysis } from "modules/shared/types";

export function analyzeNote(content: string): NoteAnalysis {
  if (!Rules.shouldTriggerAIForNote(content)) {
    return {
      summary: null,
      tags: [],
    };
  }

  return {
    summary: content.slice(0, 100),
    tags: ["auto"],
  };
}
