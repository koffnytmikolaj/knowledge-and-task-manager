import type { Note } from "domain/note/Note";

export type NewNote = Pick<Note, "title" | "content"> &
  Partial<Pick<Note, "projectId">>;

export interface NoteRepository {
  create(note: NewNote): Promise<Note>;
  findById(id: string): Promise<Note | null>;
  findAll(): Promise<Note[]>;
}
