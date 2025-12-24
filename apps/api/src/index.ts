import { Hono } from "hono";
import { initDatabase } from "./database/db";
import { corsMiddleware } from "./middlewares/corsMiddleware";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";
import authRoutes from "./routes/authRoutes";
import loginRoutes from "./routes/authRoutes";

const app = new Hono();

const db = initDatabase();

// middlewares
app.use("*", corsMiddleware);
app.use("*", loggerMiddleware);

app.route("/auth", authRoutes);
app.route("/auth", loginRoutes);

app.get("/", (c) => {
  return c.text("User and Task Management");
});

app.get("/db-connection", (c) => {
  const result = db.query("SELECT sqlite_version()").get();
  console.log("Database connected successfully", result);

  return c.json({
    message: "Database connected successfully",
    sqliteVersion: result,
  });
});

export default app;
