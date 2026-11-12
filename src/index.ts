import { serve } from "@hono/node-server";
import { Hono } from "hono";
import {
  borrowBookApplicationService,
  findAllBooksApplicationService,
  registerBookApplicationService,
} from "./container.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/ping", (c) => {
  return c.text("pong");
});

app.get("/books", async (c) => {
  const books = await findAllBooksApplicationService.execute();
  return c.json(books);
});

app.post("/books", async (c) => {
  const { title, isbn } = await c.req.json<{ title: string; isbn: string }>();

  const newBook = await registerBookApplicationService.execute(title, isbn);
  return c.json(newBook);
});

app.post("/users/:userId/borrow", async (c) => {
  const { userId } = c.req.param();
  const { bookId } = await c.req.json<{ bookId: number }>();

  const borrowBook = await borrowBookApplicationService.execute(
    Number(userId),
    bookId,
  );
  return c.json({
    message: `${borrowBook.userName}が${borrowBook.bookTitle}を借りました`,
  });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
