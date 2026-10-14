import type { Note } from "domain/note/Note";
import type { NoteRepository } from "./NoteRepository";

export function getNote(
  id: string,
  repository: NoteRepository,
): Promise<Note | null> {
  return repository.findById(id);
}
