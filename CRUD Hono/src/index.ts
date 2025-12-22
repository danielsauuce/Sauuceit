import { Hono } from "hono";
import { initDatabase } from "./database/db";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

const db = initDatabase();

app.use("*", cors());
app.use("*", logger());

app.get("/", (c) => {
  return c.text("User and Task Management");
});

app.get("/db-connection", (c) => {
  const result = db.query("SELECT sqlite_version()").get();
  console.log("Databse connected successfully", result);

  return c.json({
    message: "Database connected succefully",
    sqliteVersion: result,
  });
});

export default app;
