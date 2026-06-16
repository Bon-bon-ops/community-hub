const express = require("express");
const router = express.Router();
const pool = require("../db/pool");
const { requireAuth } = require("../middleware/auth");

router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    res.render("posts/index", { title: "Blog Posts", posts: result.rows });
  } catch (err) {
    next(err);
  }
});

router.get("/new", requireAuth, (req, res) => {
  res.render("posts/new", { title: "New Post" });
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { title, author, content } = req.body;
    await pool.query(
      "INSERT INTO posts (title, author, content) VALUES ($1, $2, $3)",
      [title, author, content]
    );
    res.redirect("/posts");
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).render("404", { title: "Not Found" });
    }
    res.render("posts/show", { title: "Post Details", post: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

router.get("/:id/edit", requireAuth, async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).render("404", { title: "Not Found" });
    }
    res.render("posts/edit", { title: "Edit Post", post: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const { title, author, content } = req.body;
    await pool.query(
      "UPDATE posts SET title = $1, author = $2, content = $3 WHERE id = $4",
      [title, author, content, req.params.id]
    );
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    await pool.query("DELETE FROM posts WHERE id = $1", [req.params.id]);
    res.redirect("/posts");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
