-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "Note" (
    "id" UUID NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "content" TEXT NOT NULL,
    "projectId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" UUID NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'TODO',
    "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "projectId" UUID,
    "noteId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Note_projectId_idx" ON "Note"("projectId");

-- CreateIndex
CREATE INDEX "Note_updatedAt_idx" ON "Note"("updatedAt");

-- CreateIndex
CREATE INDEX "Project_updatedAt_idx" ON "Project"("updatedAt");

-- CreateIndex
CREATE INDEX "Task_projectId_idx" ON "Task"("projectId");

-- CreateIndex
CREATE INDEX "Task_noteId_idx" ON "Task"("noteId");

-- CreateIndex
CREATE INDEX "Task_status_idx" ON "Task"("status");

-- CreateIndex
CREATE INDEX "Task_priority_idx" ON "Task"("priority");

-- CreateIndex
CREATE INDEX "Task_updatedAt_idx" ON "Task"("updatedAt");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;
