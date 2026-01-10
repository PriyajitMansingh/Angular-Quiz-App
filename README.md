# Angular-Quiz-App
A full-stack Question Board / Quiz application built using Angular, Node.js, Express, and SQL Server with authentication, quiz logic, and dynamic UI.
A full-stack Question Board / Quiz Management System built using Angular for the frontend, Node.js + Express for the backend, and SQL Server for database management.
This project is designed to manage questions, options, and answers with authentication and role-based features, making it suitable for learning platforms, quizzes, or internal assessment systems.

🚀 Features
👤 Authentication

User Signup & Login

Token-based authentication (JWT)

Protected routes using Angular Auth Guards

HTTP Interceptor for automatic token attachment

📋 Question Management

Add new questions with multiple options

Store correct answers securely in backend

Fetch questions category-wise

Display questions dynamically using cards

🧠 Quiz Logic

User can select an option

Selected option is compared with the correct answer from backend

Correct answer highlighted in green

Wrong answer handling supported

Success message shown after adding a question

🧩 Frontend (Angular)

Sidebar → Category → Card List flow

State management using BehaviorSubject

Modular structure (auth, services, components)

Responsive UI with clean CSS

Uses Observables and RxJS properly

🗄️ Backend (Node.js)

RESTful APIs using Express

SQL Server database integration

Password hashing using bcrypt

UUID-based unique IDs

Environment variables using dotenv

🛠️ Tech Stack
Frontend

Angular

TypeScript

RxJS

HTML / CSS

Backend

Node.js

Express.js

JWT Authentication

bcrypt.js

Database

Microsoft SQL Server
