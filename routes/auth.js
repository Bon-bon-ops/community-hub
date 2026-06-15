const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const router = express.Router();


router.get("/register", (req, res) => {
  res.render("auth/register", { title: "Register" });
});


router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    req.session.error = "Username and password are required.";
    return res.redirect("/auth/register");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existing = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );

    if (existing.rows.length > 0) {
      req.session.error = "That username is already taken.";
      return res.redirect("/auth/register");
    }

    const result = await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username",
      [username, hashedPassword]
    );

    req.session.user = result.rows[0];
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

router.get("/login", (req, res) => {
  res.render("auth/login", { title: "Login" });
});


router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    req.session.error = "Username and password are required.";
    return res.redirect("/auth/login");
  }

  try {
    const result = await pool.query(
      "SELECT id, username, password_hash FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      req.session.error = "Invalid username or password.";
      return res.redirect("/auth/login");
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      req.session.error = "Invalid username or password.";
      return res.redirect("/auth/login");
    }

    req.session.user = { id: user.id, username: user.username };
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
