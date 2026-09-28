import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "src/infrastructure/db/schema",
  migrations: {
    path: "src/infrastructure/db/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});