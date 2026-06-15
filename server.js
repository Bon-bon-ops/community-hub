const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
require("dotenv").config();

const postsRouter = require("./routes/posts");
const eventsRouter = require("./routes/events");
const authRouter = require("./routes/auth");
const { requireAuth } = require("./middleware/auth");
const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const { initializeDatabase } = require("./db/init");

const app = express();
const PORT = process.env.PORT  3000;

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// express-ejs-layouts lets every page share one layout.ejs
// (the "research component" — EJS layout/partial reuse)
app.use(expressLayouts);
app.set("layout", "layout");

// Middleware
app.use(express.urlencoded({ extended: true })); // parse form submissions
app.use(express.static(path.join(__dirname, "public"))); // serve CSS/static files
app.use(methodOverride("_method")); // allow PUT/DELETE from HTML forms
app.use(
  session({
    secret: process.env.SESSION_SECRET  "change_this_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user  null;
  res.locals.error = req.session.error  null;
  delete req.session.error;
  next();
});
app.use(logger);

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.use("/auth", authRouter);
app.use("/posts", requireAuth, postsRouter);
app.use("/events", requireAuth, eventsRouter);

//404 handler
app.use(notFound);

//Error handler
app.use(errorHandler);

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(Server running at http://localhost:${PORT});
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });