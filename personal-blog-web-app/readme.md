# Personal Blog Web App

A simple Node.js and Express-based personal blogging platform that allows users to register, log in, create, update, and delete blog posts. The app uses EJS for templating and stores user and blog data in JSON files for simplicity.

## Features

- User registration and login with JWT-based authentication
- Create, view, update, and delete personal blog posts
- Dashboard with recent posts and post count
- View all recent posts from all users (last 48 hours)
- Contact page with social links
- Responsive UI using Bootstrap and custom CSS

## Project Structure
├── controller/ # Controllers for handling business logic │ └── login.controll.js ├── middleware/ # Middleware (JWT verification) │ └── verifyjwt.js ├── public/ # Static assets (CSS, images, JS) ├── routes/ # Express route definitions │ └── index.route.js ├── utils/ # Utility classes and helpers ├── views/ # EJS templates for rendering pages ├── .env # Environment variables (JWT secret, expiry) ├── .env.example # Example environment file ├── index.js # Main server entry point ├── package.json └── readme.md

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Debanjan2007/roadmap_projects.git
   cd personal-blog-web-app
2. Install dependencies:
npm install

3. Copy .env.example to .env and set your JWT secret and token expiry:
cp .env.example .env
# Edit .env to set JWT_TOKEN_SECRET and TOKEN_EXPIRY

Start the development server:

npm start

The app will run at http://localhost:6800.

Usage -
    - Visit /api/v1/blog/ to access the login page.
    - After logging in, you can create, view, update, and delete your blog posts.
    - Use the dashboard to see your recent posts and stats.
    - Visit /api/v1/blog/home to see recent posts from all users.
    - Visit /api/v1/blog/contact for contact information.

Main Dependencies :
    - express
    - ejs
    - jsonwebtoken
    - dotenv
    - cookie-parser
    - body-parser

Made with ❤️ by Debanjan Das