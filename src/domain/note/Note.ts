export type Note = {
  id: string;
  title: string;
  content: string;
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
};
