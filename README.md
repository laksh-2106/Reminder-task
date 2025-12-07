# Task Manager - Full Stack Application

A modern full stack task management application built with React, Vite, and Supabase.

## Features

- User authentication with email and password
- Create, read, update, and delete tasks
- Mark tasks as complete or incomplete
- Secure data storage with Supabase
- Row-level security for data protection
- Clean and responsive UI with Tailwind CSS

## Tech Stack

- Frontend: React 18, Vite
- Backend: Supabase (PostgreSQL database)
- Authentication: Supabase Auth
- Styling: Tailwind CSS

## Getting Started

The application is already configured and ready to use. All dependencies are installed and the database is set up with proper security policies.

## Project Structure

- `/src` - React application source code
  - `/components` - React components (Login, TaskList)
  - `App.jsx` - Main application component
  - `api.js` - Supabase API functions
  - `supabaseClient.js` - Supabase client configuration
- `vite.config.js` - Vite configuration
- `tailwind.config.cjs` - Tailwind CSS configuration

## Database Schema

The application uses a single `tasks` table with the following structure:
- `id` - Unique identifier (UUID)
- `user_id` - User who owns the task (UUID, references auth.users)
- `title` - Task description (text)
- `completed` - Task status (boolean)
- `created_at` - Creation timestamp

All data is protected with Row Level Security policies ensuring users can only access their own tasks.
