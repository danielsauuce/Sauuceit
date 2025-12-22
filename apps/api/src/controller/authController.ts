import { initDatabase } from "../database/db";
import { Context } from "hono";
import { Database } from "bun:sqlite";
import { User } from "../types";
// import { password as bunPassword } from "bun";

export async function RegisterUser(c: Context, db: Database) {
  const { username, password, role = "user" } = await c.req.json();

  if (!username || !password) {
    return c.json(
      {
        message: "Username and Password required",
      },
      400
    );
  }

  if (role !== "user" && role !== "admin") {
    return c.json({ message: "Invalid role" }, 400);
  }

  try {
    const existingUser = db
      .query("SELECT * FROM users WHERE username = ?")
      .get(username) as User | undefined;

    if (existingUser) {
      return c.json(
        {
          message: "User already exist, Please try again with another Username",
        },
        400
      );
    }

    //hashing the password
    const hashedPassword = await Bun.password.hash(password);

    db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [
      username,
      hashedPassword,
      role,
    ]);

    return c.json(
      {
        message: "User Registered Successfully",
      },
      201
    );
  } catch (error) {
    console.log(error);
    return c.json(
      {
        message: "Internal Server Error",
      },
      500
    );
  }
}
