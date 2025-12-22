import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/home", (c) => {
  return c.text("Daniel is Home at 2pm!");
});

export default app;
