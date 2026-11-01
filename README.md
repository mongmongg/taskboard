# Taskboard - Kanban Board

![JavaScript Logo](https://img.shields.io/badge/JavaScript-yellow?logo=javascript&logoColor=white)
![React Logo](https://img.shields.io/badge/React-black?logo=react)
![Vite Logo](https://img.shields.io/badge/Vite-black?logo=vite)
![Tailwind Logo](https://img.shields.io/badge/Tailwind_CSS-black?logo=tailwindcss)
![Nodejs Logo](https://img.shields.io/badge/Nodejs-green?logo=node.js&logoColor=white)
![Express Logo](https://img.shields.io/badge/Express-black?logo=express)
![MongoDB Logo](https://img.shields.io/badge/MongoDB-success?logo=mongodb&logoColor=white)

Taskboard is a Kanban-based task management application taht helps users visualize and managment their workflows. It features columns representing different stages of a workflow ,while task cards allow users to manage and track individual tasks as they progress through each stages.

---
## Demo
<img width="448" height="264" alt="1" src="https://github.com/user-attachments/assets/dfac3ad1-c67c-4258-b32a-4d0215fc5bc0" />
<img width="448" height="264" alt="2" src="https://github.com/user-attachments/assets/4cb1c848-a1fe-4163-a885-1e1175ede5ed" />
<img width="448" height="264" alt="3" src="https://github.com/user-attachments/assets/32578d72-fb38-4f5f-9937-8f55468eec44" />
<img width="448" height="264" alt="4" src="https://github.com/user-attachments/assets/9b8697d4-5a0c-4111-b6c8-8de7bbb96eaa" />
<img width="448" height="264" alt="5" src="https://github.com/user-attachments/assets/7531233d-2e87-44dc-888d-789742a65d37" />
<img width="448" height="264" alt="6" src="https://github.com/user-attachments/assets/707278cd-1355-4aee-b09c-a8e39a3b465d" />
<img width="164" height="330" alt="responsive-1" src="https://github.com/user-attachments/assets/1452a055-5328-4410-a8b9-94cbce005953" />
<img width="300" height="330" alt="responsive-2" src="https://github.com/user-attachments/assets/8faa3cb0-bb2f-4ea5-a5c8-f7808ef3d60c" />

Link for the website **https://taskboard-anchitthab.netlify.app/**

for testing can use 
```text
Email: test@test.com
Password: 12345678
```

## Features

- **Authentication** - Secure user login and registration by **JSON Web Tokens (JWT)**, Password are hashed before stored in the database, and authentication tokens are stored in **HttpOnly cookies**.
- **Database** - MongoDB for storing users and boards data.
- **Frontend** - Responsive UI buit with JavaScript, React, and TailwindCSS.
- **Backend** - Node.js + Express handles authentication, and data management.

---

## Tech Stack

- Language: JavaScript
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Authentication: JWT, HttpOnly Cookies, bcrypt
- API Requests: Fetch API
- Deployment: Netlify (Frontend), Render (Backend)

---

## Quick Start

### Prerequisites

- Node.js
- MongoDB: Local installation or MongoDB Atlas account

### Installation

```text
#Clone the repository
git clone https://github.com/mongmongg/taskboard.git

#Install backend dependencies
cd taskboard/backend
npm install

#Install frontend dependencies
cd ../frontend 
npm install
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
│   │   ├── components/ Reuseable React components
│   │   ├── pages/      Page-level components
│   │   ├── hooks/      Custom hooks
│   │   ├── services/
│   │   ├── context/    Shared application state
│   │   ├── utils/      fetch API logic
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/    Handles application request logic
│   ├── data/           Database connection function
│   ├── middlewares/    Handles middleware for example CORS and check authentication
│   ├── models/         Defines database schemas and custom error function
│   ├── routes/         Defines API endpoints
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
- Built with Node.js + Express
- Handles authentication using JWT and bcrypts for hashing password and database read/write via Mongoose.
  
**Database**
- MongoDB + Mongoose stores and manage user accounts, boards and tasks data.

#### Example API Endpoint

**Auth Routes**
|Endpoint|Method|Description|
|-----------|---------|--------------|
| /user/verify|GET| Verify user token|
|/login|POST| Log in user|
|/signup|POST|Regiter a new user|
|/:uId|GET|Retrieve user data by user ID|
|/:uId/settings|PATCH|Edit user data|
|/:uId/settings/delete|DELETE|Delete user account|


**Boards Routes**
|Endpoint|Method|Description|
|-----------|---------|--------------|
|/:uId/boards|POST|Create new boards|

**Tasks Routes**
|Endpoint|Method|Description|
|-----------|---------|--------------|
|/:uId/boards/:bId/task/:tId|GET|Retrieve a specific task by its ID|
|/:uId/boards/:bId/task/:status|POST|Create new task|

**Environment Variables**
|Variables|Description|
|------------|--------------|
|VITE_APP_BACKEND_URL|Backend URL|
|PORT| Backend port (default:3000)|
|DATABASE| MongoDB project URL|

