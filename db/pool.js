const { Pool } = require("pg");
require("dotenv").config();

// A connection pool lets Express reuse database connections efficiently
// instead of opening a new one for every query.
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

module.exports = pool;
