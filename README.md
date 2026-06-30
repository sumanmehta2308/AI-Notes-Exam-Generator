# AI Note Exam Generator 🤖📚

An AI-powered web application that helps students generate smart notes, summaries, and exam preparation material using Artificial Intelligence.

The application allows users to upload or enter content and generate useful study resources like notes, questions, and learning material automatically.

## 🚀 Features

* User authentication
* AI-generated notes
* AI exam question generation
* Content summarization
* PDF download support
* Secure API communication
* Responsive user interface
* Payment integration support
* User dashboard

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* Tailwind CSS
* Redux Toolkit
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* REST API

### AI Integration

* AI API integration for:

  * Note generation
  * Question generation
  * Content summarization

## 📂 Project Structure

```
## ⚙️ Installation and Setup
### Clone Repository

```bash
git clone <repository-url>
```

Move into project folder:

```bash
cd AI-Note-Exam-Generator
```

## Frontend Setup

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
VITE_BACKEND_URL=your_backend_url
```

Run frontend:

```bash
npm run dev
```

## Backend Setup

Go to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
PORT=8000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

AI_API_KEY=your_ai_api_key

FRONTEND_URL=your_frontend_url
```

Start backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

## 🔐 Environment Variables

Never upload `.env` files to GitHub.

Frontend:

```
VITE_BACKEND_URL
```

Backend:

```
PORT
MONGODB_URI
JWT_SECRET
AI_API_KEY
FRONTEND_URL
```

## 🌐 Deployment

Frontend can be deployed on:

* Vercel
* Netlify

Backend can be deployed on:

* Render
* Railway
* AWS

Database:

* MongoDB Atlas

## 📌 API Overview

Example:

Authentication:

```
POST /api/auth/register
POST /api/auth/login
```

Generate Notes:

```
POST /api/notes/generate
```

Download PDF:

```
GET /api/notes/download
```

## 🔒 Security

* Environment variables protected
* JWT-based authentication
* Password encryption
* Secure API routes

## 👨‍💻 Author

Suman Mehta

MCA Student | Full Stack Developer

## 📄 License

This project is created for learning and development purposes.
