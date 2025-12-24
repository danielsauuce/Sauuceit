import { initDatabase } from "../database/db";
import { Context } from "hono";
import { Database } from "bun:sqlite";
import { User } from "../types";
import { password as bunPassword } from "bun";

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
    const hashedPassword = await db.run(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, hashedPassword, role]
    );

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

export async function LoginUser(c: Context, db: Database) {
  const { username, password } = await c.req.json();

  try {
    if (!username || !password) {
      return c.json(
        {
          error: "Username and password are required",
        },
        400
      );
    }

    const user = db
      .query("SELECT * FROM users WHERE username = ?")
      .get(username) as User | undefined;

    if (!user) {
      return c.json(
        {
          message: "Invalid Credentials",
        },
        400
      );
    }

    //compare hash password to password entered
    const isValidPassword = await bunPassword.verify(password, user.password);
    if (!isValidPassword) {
      return c.json({
        message: "Invalid Credentials",
      });
    }

    return c.json(
      {
        message: "Login in Successfully",
      },
      200
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
