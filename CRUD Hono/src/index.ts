import { Hono } from "hono";
import { initDatabase } from "./database/db";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

const db = initDatabase();

app.use("*", cors());
app.use("*", logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/home", (c) => {
  return c.text("Daniel is Home at 2pm!");
});

export default app;
