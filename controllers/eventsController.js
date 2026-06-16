const pool = require("../db/pool");

exports.getAllEvents = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM events ORDER BY event_date ASC");
    res.render("events/index", { title: "Events", events: result.rows });
  } catch (err) {
    next(err);
  }
};

exports.getNewEvent = (req, res) => {
  res.render("events/new", { title: "New Event" });
};

exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, location, event_date } = req.body;
    const author = req.session.user.username;
    await pool.query(
      "INSERT INTO events (title, description, location, event_date, author) VALUES ($1, $2, $3, $4, $5)",
      [title, description, location, event_date, author]
    );
    res.redirect("/events");
  } catch (err) {
    next(err);
  }
};

exports.getEvent = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM events WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).render("404", { title: "Not Found" });
    res.render("events/show", { title: "Event Details", event: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.getEditEvent = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM events WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).render("404", { title: "Not Found" });
    if (result.rows[0].author !== req.session.user.username) {
      req.session.error = "You can only edit your own events.";
      return res.redirect(`/events/${req.params.id}`);
    }
    res.render("events/edit", { title: "Edit Event", event: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.updateEvent = async (req, res, next) => {
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
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM events WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).render("404", { title: "Not Found" });
    if (result.rows[0].author !== req.session.user.username) {
      req.session.error = "You can only delete your own events.";
      return res.redirect(`/events/${req.params.id}`);
    }
    await pool.query("DELETE FROM events WHERE id = $1", [req.params.id]);
    res.redirect("/events");
  } catch (err) {
    next(err);
  }
};