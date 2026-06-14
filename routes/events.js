const express = require("express");
const router = express.Router();
const pool = require("../db/pool");
const { requireAuth } = require("../middleware/auth");

router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events ORDER BY event_date ASC"
    );
    res.render("events/index", { title: "Events", events: result.rows });
  } catch (err) {
    next(err);
  }
});

router.get("/new", requireAuth, (req, res) => {
  res.render("events/new", { title: "New Event" });
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { title, description, location, event_date } = req.body;
    await pool.query(
      "INSERT INTO events (title, description, location, event_date) VALUES ($1, $2, $3, $4)",
      [title, description, location, event_date]
    );
    res.redirect("/events");
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM events WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).render("404", { title: "Not Found" });
    }
    res.render("events/show", {
      title: "Event Details",
      event: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id/edit", requireAuth, async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM events WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).render("404", { title: "Not Found" });
    }
    res.render("events/edit", {
      title: "Edit Event",
      event: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const { title, description, location, event_date } = req.body;
    await pool.query(
      "UPDATE events SET title = $1, description = $2, location = $3, event_date = $4 WHERE id = $5",
      [title, description, location, event_date, req.params.id]
    );
    res.redirect(`/events/${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    await pool.query("DELETE FROM events WHERE id = $1", [req.params.id]);
    res.redirect("/events");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
