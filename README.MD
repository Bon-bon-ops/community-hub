Community Hub
A Server-Side Rendered (SSR) web application combining a blog platform and an event management system, built with Node.js, Express, EJS, and PostgreSQL.

Group Members

Name 1 —  alemseged sileshi id:055
Name 2 — dagmawi tarekegn  id:065
Name 3 — ruth getahun id:129
Name 4 - reda mohammed  id:037
Name 5 — mohammed abdulah id:080

View, create, edit, and delete blog posts
View, create, edit, and delete events

Shared layout and reusable partials (navbar, footer) across all pages
Form handling
Custom logging middleware
PostgreSQL persistence with parameterized queries
Technologies Used
Node.js
Express.js
EJS (with express-ejs-layouts for layout reuse)
bcrypt
PostgreSQL (via pg)
method-override (for PUT/DELETE form support)
Installation
Clone the repository

git clone <https://github.com/Bon-bon-ops/community-hub>
cd community-hub
Install dependencies

npm install
Set up PostgreSQL

Create a database:
CREATE DATABASE community_hub;
Run the schema file to create tables and seed sample data:
psql -U postgres -d community_hub -f db/schema.sql
Configure environment variables

Copy .env.example to .env
Fill in your PostgreSQL username, password, and database name
Run the app

npm run dev
Visit http://localhost:3000

Project Structure
community-hub/
├── server.js          # App entry point
├── db/
│   ├── pool.js         # PostgreSQL connection pool
│   └── schema.sql       # Table definitions + sample data
├── routes/
│   ├── posts.js         # CRUD routes for blog posts
│   └── events.js        # CRUD routes for events
├── views/
│   ├── layout.ejs       # Shared layout
│   ├── partials/         # Navbar & footer (reused across pages)
│   ├── posts/            # Post views (index, show, new, edit)
│   └── events/           # Event views (index, show, new, edit)
└── public/css/style.css # Styling


