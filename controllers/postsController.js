const pool = require("../db/pool");

exports.getAllPosts = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY created_at DESC");
    res.render("posts/index", { title: "Blog Posts", posts: result.rows });
  } catch (err) {
    next(err);
  }
};

exports.getNewPost = (req, res) => {
  res.render("posts/new", { title: "New Post" });
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const author = req.session.user.username;
    await pool.query(
      "INSERT INTO posts (title, author, content) VALUES ($1, $2, $3)",
      [title, author, content]
    );
    res.redirect("/posts");
  } catch (err) {
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).render("404", { title: "Not Found" });
    res.render("posts/show", { title: "Post Details", post: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.getEditPost = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).render("404", { title: "Not Found" });
    if (result.rows[0].author !== req.session.user.username) {
      req.session.error = "You can only edit your own posts.";
      return res.redirect(`/posts/${req.params.id}`);
    }
    res.render("posts/edit", { title: "Edit Post", post: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    await pool.query(
      "UPDATE posts SET title = $1, content = $2 WHERE id = $3",
      [title, content, req.params.id]
    );
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).render("404", { title: "Not Found" });
    if (result.rows[0].author !== req.session.user.username) {
      req.session.error = "You can only delete your own posts.";
      return res.redirect(`/posts/${req.params.id}`);
    }
    await pool.query("DELETE FROM posts WHERE id = $1", [req.params.id]);
    res.redirect("/posts");
  } catch (err) {
    next(err);
  }
};