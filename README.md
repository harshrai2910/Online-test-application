# Online Test Application

A full-stack MERN-style web app where users sign up, log in, take a timed multiple-choice test, and view their results and past attempts. The backend uses session-based authentication and follows the MVC pattern.

## Features

- Signup, login, and logout with session-based authentication
- Password hashing with bcrypt
- Protected routes (test pages require login)
- Timed test (10 minutes) with a live countdown and auto-submit
- Test progress (questions, answers, timer) survives a page refresh
- Server-side result verification
- Result page and test history

## Tech Stack

| Layer        | Technology                                         |
| ------------ | -------------------------------------------------- |
| Frontend     | React, React Router, React Hook Form, Tailwind CSS |
| Backend      | Node.js, Express, express-validator, bcrypt, cors  |
| Database     | MongoDB                                            |
| Auth         | Session-based, bcrypt for password hashing         |
| Architecture | MVC                                                |

## Project Structure

```
├── client/                     # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── auth/           # Signup, Login
│   │   │   ├── navigation/     # Navbar
│   │   │   ├── Test/           # StartTest, TestQuestions, QuestionCard
│   │   │   │                   # Timer, Result, History
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoaderComponent.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/           # API calls
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vercel.json
│   └── vite.config.js
└── server/                     # Express backend
    ├── controller/             # authController.js, testController.js
    ├── model/                  # User.js, Questions.js, History.js
    ├── router/                 # authRouter.js, testRouter.js
    ├── utils/                  # pathUtils.js
    └── app.js                  # Entry point
```

## Database Models

- **User**: account details and hashed password
- **Questions**: test questions and their options
- **History**: a user's past test attempts and scores

## API Endpoints

> TODO: confirm paths and methods against your routers.

| Method | Endpoint        | Description                          |
| ------ | --------------- | ------------------------------------ |
| POST   | `/signup`       | Register a new user                  |
| POST   | `/login`        | Log in and create a session          |
| POST   | `/logout`       | Destroy the session                  |
| GET    | `/status`       | Check whether the user is logged in  |
| GET    | `/test/send`    | Fetch test questions                 |
| POST   | `/test/verify`  | Verify answers and return the result |
| GET    | `/test/history` | Fetch the user's past attempts       |

## Getting Started

### Prerequisites

- Node.js
- MongoDB (Atlas)

### Installation

```bash
git clone https://github.com/harshrai2910/Online-test-application.git
cd Online-test-application
```

**Backend**

```bash
cd server
npm install
```

Create a `server/.env` file:

```
PORT=3004     #optional
MONGODB_PATH=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
FRONTEND_URL=http://localhost:5173/
```

> TODO: match these variable names to your `.env`.

```bash
npm start
```

Create a `client/.env` file:

```bash
VITE_API_URL="http://localhost:3004"
```

**Frontend**

```bash
cd client
npm install
npm run dev
```

## How the Test Works

1. Log in and click **Start Test**.
2. Questions load from the server and the 10-minute timer starts.
3. Answers are saved as you select them, so a refresh won't lose progress.
4. Submit manually, or the test auto-submits when the timer reaches zero.
5. The server verifies the answers and stores the attempt in history.

## Future Improvements

- Enforce the time limit on the server
- Admin panel for managing questions

## Author

[harshrai2910](https://github.com/harshrai2910)
