import express from "express";

import {
  getPostsISR,
  generatePosts,
} from "../services/isrService.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const posts = await getPostsISR();

    res.json({
      cached: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/revalidate", async (req, res) => {
  try {
    const posts = await generatePosts();

    res.json({
      revalidated: true,
      total: posts.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;