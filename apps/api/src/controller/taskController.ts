import { Context } from "hono";
import { Database } from "bun:sqlite";
import { Task } from "../types";

export async function createTask(c: Context, db: Database) {
  //authenticated user only can create (admin only)
  const userId = c.get("jwtPayload").userId;
  const role = c.get("jwtPayload").role;
}
