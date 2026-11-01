# Taskboard - Kanban Board

![JavaScript Logo](https://img.shields.io/badge/JavaScript-yellow?logo=javascript&logoColor=white)
![React Logo](https://img.shields.io/badge/React-black?logo=react)
![Vite Logo](https://img.shields.io/badge/Vite-black?logo=vite)
![Tailwind Logo](https://img.shields.io/badge/Tailwind_CSS-black?logo=tailwindcss)
![Nodejs Logo](https://img.shields.io/badge/Nodejs-green?logo=node.js&logoColor=white)
![Express Logo](https://img.shields.io/badge/Express-black?logo=express)
![MongoDB Logo](https://img.shields.io/badge/MongoDB-success?logo=mongodb&logoColor=white)

Taskboard is a personal visualize and managment workflows tool. It features columns representing stages of a workflow process.
the cards are used to track individual tasks as they progress through the stages.

---
## Demo
Link for the website **https://taskboard-anchitthab.netlify.app/**

for testing can use 
```text
Email: test@test.com
Password: 12345678
```

## Features

- **Authentication** - Secure user login and registration by **JSON Web Tokens (JWT)**, hashed password before stored and stored authentications tokens in **HttpOnly cookies**.
- **Database** - MongoDB for storing users and boards data.
- **Frontend** - Responsive UI buit with JavaScript, React, and TailwindCSS.
- **Backend API** - Node.js + Express handles authentication, and data management.

---

## Tech Stack

- Language: JavaScript
- Frontend: React, TailwindCSS
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Authentication: JWT, HttpOnly Cookies
- API Requests: Fetch API
- Deployment: Netlify (Frontend), Render (Backend)

---

## Quick Start

### Prerequisites

- Node.js
- MongoDB: Local installation or MongoDB Atlas account

### Installations

**Clone the repository**
```text
git clone https://github.com/mongmongg/taskboard.git
```
**Install Dependencies**

Backend:
```text
cd backend && npm install
```
Frontend: 
```text
cd frontend && npm install
```
**Update .env with your configuration**

- Database URL

**Development**

Backend:
```text
cd backend && npm run dev
```
Frontend:
```text
cd frontend && npm run dev
```
## Repository Structure
#### Repository Structure

```text
taskboard/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── data/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```
## Architecture Overview

**Frontend**

- Built with JavaScript + React + Tailwind CSS
- Connects to backend API for authentication and data retrieval and management.
  
**Backend**
- Build with Node.js + Express
- Handles authentication and database read/write via Mongoose.
  
**Database**
- MongoDB + Mongoose stores and manage user accounts, boards and tasks data.

#### Example API Endpoint

**Auth Routes**
|Endpoint|Method|Description|
|-----------|---------|--------------|
| /user/verify|GET| Verify user token|
|/login|POST| Log in user|
|/signup|POST|Regiter new user|


**Boards Routes**
|Endpoint|Method|Description|
|-----------|---------|--------------|
|/:uId/boards|POST|Create new boards|

**Tasks Routes**
|Endpoint|Method|Description|
|-----------|---------|--------------|
|/:uId/boards/:bId/task/:tId|GET|Retrieve a specific task by its ID|

**Environment Variables**
|Variables|Description|
|------------|--------------|
|VITE_APP_BACKEND_URL|Backend URL|
|PORT| Backend port (default:3000)|
|DATABASE| MongoDB project URL|

