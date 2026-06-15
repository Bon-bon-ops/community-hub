-- Run this once to set up your database tables.
-- Example: psql -U postgres -d community_hub -f db/schema.sql

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional sample data
INSERT INTO posts (title, author, content) VALUES
  ('Welcome to Community Hub', 'Admin', 'This is our first blog post. Feel free to edit or delete it!'),
  ('Tips for New Members', 'Admin', 'Here are some tips to get the most out of our community...');

INSERT INTO events (title, description, location, event_date) VALUES
  ('Orientation Day', 'Meet the team and learn about upcoming activities.', 'Main Hall', '2026-06-20'),
  ('Tech Talk: Intro to PostgreSQL', 'A beginner-friendly session on databases.', 'Room 204', '2026-06-25');
