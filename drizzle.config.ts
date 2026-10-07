import { defineConfig } from "drizzle-kit";

process.loadEnvFile();

export default defineConfig({
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
