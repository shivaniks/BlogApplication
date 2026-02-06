# 📝 Blogging Platform

A full-stack blogging platform that allows users to create, edit, delete, and explore blog posts across multiple categories such as Music, Movies, Sports, Technology, and Fashion.

---

## 🚀 Features

- 📌 Category-based blogs (Music, Movies, Sports, Technology, Fashion)
- ✍️ Create new blog posts
- 📝 Edit existing blog posts
- ❌ Delete blog posts
- 👀 View blogs by category
- 👤 User-friendly interface
- 📊 Organized blog management

---

## 🛠️ Tech Stack

### Frontend
- HTML, CSS, JavaScript
- React.js

### Backend
- Node.js
- Express.js

### Database
- MongoDB

---

## 🏗️ System Architecture

                ┌────────────────────┐
                │      Frontend      │
                │     (React.js)     │
                └─────────┬──────────┘
                          │ HTTP Requests (REST API)
                          ▼
                ┌────────────────────┐
                │       Backend      │
                │  (Node.js + Express)│
                └─────────┬──────────┘
                          │ Database Queries
                          ▼
                ┌────────────────────┐
                │      Database      │
                │       MongoDB      │
                └────────────────────┘


