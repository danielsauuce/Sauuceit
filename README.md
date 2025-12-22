# Task Management API Repository

This repository contains the official backend API for **Task Management**, a user and task management system built with **Bun** and **Hono**. It provides secure user authentication, role-based access control, and CRUD operations for tasks, all backed by an **SQLite** database and validated with **Zod**.

---

## Implemented Features

- **User Authentication**: Secure sign-up and login using JWT tokens.  
- **Role-based Access**: Supports `user` and `admin` roles with proper authorization.  
- **Task Management**:
  - Create, Read, Update, and Delete tasks.
  - Task assignment to users.
  - Optional description for tasks.  
- **Input Validation**: All requests are validated using **Zod** schemas.  
- **Database Integration**: Persistent storage using **SQLite**.

---

## Tech Stack

This project is built using the following technologies:

- **Framework**: Hono (Bun runtime)  
- **Language**: TypeScript  
- **Database**: SQLite  
- **Validation**: Zod  
- **Authentication**: JWT  
- **Utilities**: Bun password hashing, middleware for logging & CORS  

---

## Project Structure

The project follows a clean and modular structure for scalability:

- **index.ts**: Entry point for Bun.serve.  
- **config/**: Environment variables and JWT configuration.  
- **database/**: Database initialization and migrations.  
- **routes/**: Route definitions for authentication and tasks.  
- **controllers/**: Request handling logic for authentication and tasks.  
- **middlewares/**: Custom middleware (authentication, logging, CORS). 
- **types/**: Shared TypeScript types.  
- **utils/**: Helper functions and response formatting, Zod validation schemas for requests.  

---

## Installation

Follow these steps to get the project running locally:

1. **Clone the repository**  
```bash
git clone https://github.com/<your-username>/TaskManagementAPI.git

2.	**Navigate to the project directory**
cd TaskManagementAPI
