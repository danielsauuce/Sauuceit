import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { registerSchema, loginSchema } from "../utils/authValidationSchema";
import { RegisterUser } from "../controller/authController";
import { initDatabase } from "../database/db";

const router = new Hono();
const db = initDatabase();

router.post("/register-user", zValidator("json", registerSchema), (c) =>
  RegisterUser(c, db)
);

export default router;
