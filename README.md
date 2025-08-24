# Tell Be

Tell Be is a forum web application built with React. It follows clean architecture principles to provide a maintainable
and scalable codebase. The application includes user authentication, thread and comment functionality.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [UI/UX Design Principles](#uiux-design-principles)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- User authentication with registration and login functionality
- Token-based authentication using local storage
- View all threads
- View thread detail
- Submit a comment
- Submit new thread
- Up vote thread
- Down vote thread
- Neutral vote thread
- Up vote comment
- Down vote comment
- Neutral vote comment
- Optimistic UI updates for voting actions (threads and comments)
- View leaderboard

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/arieftb/tell-be-web.git
   cd tell-be-web
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

The project follows a clean architecture approach with the following structure:

```markdown
src/
├── application/
│ ├── auth/
│ ├── thread/
│ └── user/
├── data/
│ ├── infrastructure/
│ │ ├── api/
│ │ ├── auth/
│ │ ├── thread/
│ │ └── user/
│ └── persistence/
│ ├── auth/
│ ├── thread/
│ └── user/
├── domain/
│ ├── auth/
│ ├── thread/
│ └── user/
├── presentation/
│ ├── atoms/
│ ├── molecules/
│ ├── organisms/
│ ├── pages/
│ ├── redux/
│ └── templates/
├── store/
└── style/
```

## Architecture

- **Clean Architecture** - For separation of concerns and maintainability

## UI/UX Design Principles

- **Atomic Design** - For organizing UI components

## Technologies Used

- **React** - UI library (`^19.1.0`)
- **React Router DOM** - For routing and navigation (`^7.7.1`)
- **Redux Toolkit** - For state management (`^2.8.2`)
- **React Redux** - For connecting React components to Redux store (`^9.2.0`)
- **Axios** - For making HTTP requests (`^1.11.0`)
- **Vite** - Build tool and development server (`^7.0.4`)
- **PropTypes** - Runtime type checking for React props (`^15.8.1`)
- **ESLint** - For code linting and maintaining code quality, ensuring consistent code style and catching potential errors early in the development process. (`^9.30.1`)
- **React Icons** - For various icons (`^5.5.0`)
- **Zod** - For schema validation (`^4.0.17`)

## License

Copyright (c) 2025 arieftb

This project is created for educational purposes as part of
the [Menjadi React Web Developer Expert](https://www.dicoding.com/academies/418/)
course from Dicoding.
You may use this code as a reference only.
Reusing this code for submission, plagiarism, or commercial use is strictly prohibited.