CommunityHub

A community-driven platform where users can write and share blog posts and events — think Twitter, but for long-form content.



- User authentication (register, login)
- Create, read, update, and delete blog posts
- Create and manage community events
- Clean, dark-themed UI


- **Backend:** Node.js, Express.js
- **Templating:** EJS with express-ejs-layouts
- **Styling:** Custom CSS
- **Auth:** Session-based authentication
- **Database:** SQLite (via db/init)



1. Clone the repo

   git clone https://github.com/Bon-bon-ops/community-hub.git
   cd community-hub
  

2. Install dependencies
  
   npm install


3. Create a `.env` file

   SESSION_SECRET=your_secret_here


4. Start the server

   node server.js


Project Structure


community-hub/
├── public/         # Static files (CSS)
├── routes/         # Express routes (auth, posts, events)
├── views/          # EJS templates
├── middleware/     # Auth, logger, error handlers
├── db/             # Database setup
└── server.js       # App entry point


Go to your GitHub repo, click **Add file → Create new file**, name it `README.md`, paste this in, and commit it directly on GitHub!
