import { Database } from "bun:sqlite";
import { Context, Hono } from "hono";
import { taskSchema } from "../Schema/taskSchema";
import { createTask } from "../controller/taskController";
import { zValidator } from "@hono/zod-validator";
import { initDatabase } from "../database/db";

const db = initDatabase();

const router = new Hono();
console.log(router);

router.post("/tasks", zValidator("json", taskSchema), (c) => createTask(c, db));
