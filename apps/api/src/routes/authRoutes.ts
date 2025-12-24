import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { registerSchema, loginSchema } from "../Schema/authSchema";
import { LoginUser, RegisterUser } from "../controller/authController";
import { initDatabase } from "../database/db";

const router = new Hono();
const db = initDatabase();

router.post("/register-user", zValidator("json", registerSchema), (c) =>
  RegisterUser(c, db)
);

router.post("/login-user", zValidator("json", loginSchema), (c) =>
  LoginUser(c, db)
);

export default router;
