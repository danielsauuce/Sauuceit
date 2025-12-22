import { Hono } from "hono";
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { registerSchema } from "../utils/userValidator";
import { RegisterUser } from "../controller/auth";
import { Database } from "bun:sqlite";
import { initDatabase } from "../database/db";

const app = new Hono();

app.post("/register-user", zValidator("json", registerSchema), (c: Context) => {
    const db = c.get(initDatabase)
  return RegisterUser(c, db);
});
