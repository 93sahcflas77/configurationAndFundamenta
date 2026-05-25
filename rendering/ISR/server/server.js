import express from "express";
import cors from "cors";
import cron from "node-cron";

import postsRouter from "./routes/posts.js";
import { generatePosts } from "./services/isrService.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/posts", postsRouter);
cron.schedule("*/1 * * * *", () => {
  console.log("Running a task every minute");
  generatePosts();
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});