# Tell Be

Tell Be is a forum web application built with React. It follows clean architecture principles to provide a maintainable
and scalable codebase. The application includes user authentication, thread and comment functionality.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- User authentication with registration and login functionality
- Token-based authentication using local storage
- View all threads
- View thread detail
- Submit a comment

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

```
src/
├── application/
│   ├── auth/
│   ├── thread/
│   └── user/
├── data/
│   ├── infrastructure/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── thread/
│   │   └── user/
│   └── persistence/
│       ├── auth/
│       ├── thread/
│       └── user/
├── domain/
│   ├── auth/
│   ├── thread/
│   └── user/
├── presentation/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   ├── pages/
│   ├── redux/
│   └── templates/
├── store/
└── style/
```

## Technologies Used

- **React** - UI library
- **React Router DOM** - For routing and navigation
- **Redux Toolkit** - For state management
- **React Redux** - For connecting React components to Redux store
- **Axios** - For making HTTP requests
- **Vite** - Build tool and development server
- **PropTypes** - Runtime type checking for React props
- **ESLint** - For code linting and maintaining code quality
- **Clean Architecture** - For separation of concerns and maintainability
- **Atomic Design** - For organizing UI components

## License

Copyright (c) 2025 arieftb

This project is created for educational purposes as part of
the [Menjadi React Web Developer Expert](https://www.dicoding.com/academies/418/)
course from Dicoding.
You may use this code as a reference only.
Reusing this code for submission, plagiarism, or commercial use is strictly prohibited.