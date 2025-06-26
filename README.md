#  Social Media App — Full Stack Assignment (Next.js + Node + MySQL)

A full-stack **social media application** where users can register, log in, create posts, like posts, and follow other users. Built with **Next.js**, **Node.js/Express**, and **MySQL**, and uses **JWT** for authentication. The backend directly uses **raw SQL queries (no ORM like Prisma)**.

---

##  Assignment Requirements Covered

- ✅ Full REST API using **Express.js**
- ✅ **MySQL** as the relational database (no ORM used — only raw SQL queries)
- ✅ Frontend using **Next.js** and **React Router (via `react-router-dom`)**
- ✅ JWT-based authentication with protected routes
- ✅ Ability to **register**, **login**, **create posts**, **like**, and **follow users**
- ✅ **Paginated** feed
- ✅ Clear code documentation
- ✅ Responsive and styled UI

---

## 🧠 Tech Stack

| Layer        | Tech Used                       |
|--------------|---------------------------------|
| Frontend     | Next.js (React-based), Tailwind |
| Routing      | React Router DOM (inside Next.js) |
| Backend      | Node.js, Express.js             |
| Database     | MySQL (No ORM)                  |
| Auth         | JWT (JSON Web Tokens)           |

---

## 🛠️ Features

-  User registration and login with hashed passwords
-  JWT-based secure session handling
-  Create and view posts
-  Like posts
-  Follow other users
-  Paginated feed (5 posts per page)
-  Modern, animated UI with Tailwind CSS
-  Raw SQL queries (No ORM)

---

##  Folder Structure

```
social-media-app/
├── client/              # Frontend (Next.js + React Router)
│   ├── pages/
│   │   ├── index.jsx    # Login
│   │   ├── register.jsx # Registration
│   │   └── dashboard.jsx# Dashboard
│   ├── components/      # UI components
│   └── utils/           # Token handling
├── server/              # Backend (Express API)
│   ├── routes/          # Route files
│   ├── controllers/     # Business logic
│   ├── db.js            # MySQL connection
│   └── app.js           # Express app entry
```

---

##  Routes Overview

###  Auth Routes

| Method | Route           | Description            |
|--------|------------------|------------------------|
| POST   | `/api/register` | Register new user      |
| POST   | `/api/login`    | Login and get JWT      |

### 📄 Post Routes

| Method | Route             | Description            |
|--------|-------------------|------------------------|
| POST   | `/api/posts`      | Create new post        |
| GET    | `/api/posts`      | Get posts with pagination |
| POST   | `/api/posts/:id/like` | Like a post        |

### 👥 User Routes

| Method | Route              | Description             |
|--------|--------------------|-------------------------|
| GET    | `/api/users`       | Get all users           |
| GET    | `/api/users/:id`   | Get single user         |
| POST   | `/api/follow`      | Follow a user           |

---

##  Database Schema (MySQL)

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE likes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  post_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id)
);

CREATE TABLE follows (
  id INT PRIMARY KEY AUTO_INCREMENT,
  follower_id INT,
  following_id INT,
  FOREIGN KEY (follower_id) REFERENCES users(id),
  FOREIGN KEY (following_id) REFERENCES users(id)
);
```

---

##  Authentication

- Users are authenticated via **JWT (JSON Web Token)**
- Tokens are stored in **localStorage** on the frontend
- Protected routes require a valid `Authorization: Bearer <token>` header

---

##  API Sample

### Register

```http
POST /api/register
{
  "username": "Shubham Sinha",
  "email": "shubham@example.com",
  "password": "password123"
}
```

### Login

```http
POST /api/login
{
  "username": "Shubham Sinha",
  "password": "password123"
}
```

Response:
```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "id": 1,
    "username": "Shubham Sinha"
  }
}
```

---

##  Getting Started

### 1️ Clone the repository

```bash
git clone https://github.com/your-username/social-media-app
cd social-media-app
```

### 2️⃣ Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in `index/`:

```env
PORT=5000
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=social_db
```

Start backend:

```bash
npm run dev
```

### 3️⃣ Set up the frontend

```bash
cd ../client
npm install
npm run dev
```

---

## 🖼️ Screenshots

###  Login Page  
![Login](./screenshots/login.png)

###  Dashboard  
![Dashboard](./screenshots/dashboard.png)

---

##  Known Limitations

- No image uploads (only text posts)
- No password reset functionality
- JWTs are stored in localStorage (consider using httpOnly cookies in production)

---

##  Author

**Shubham Sinha**  
[GitHub](https://github.com/shubhamsinha-dev) • [LinkedIn](https://linkedin.com/in/your-profile)

---

##  License

This project is for educational/demo purposes as part of an assignment. All rights reserved to the author.