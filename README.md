# Tell Be

Tell Be is a forum web application built with React. It follows clean architecture principles to provide a maintainable
and scalable codebase. The application includes user authentication, thread and comment functionality.

## Table of Contents

- [Features](#features)
- [Live Demo](#live-demo)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [UI/UX Design Principles](#uiux-design-principles)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
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

## Live Demo

The application is deployed and accessible at: [https://tell-be-web.vercel.app/](https://tell-be-web.vercel.app/)

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

## Testing

This project implements comprehensive testing strategies to ensure code quality and functionality:

### Unit Testing
- **Vitest** - For unit testing of Redux thunks and reducers
- **Component Testing** - Unit tests for UI components (Button, Input, LoadingBar, Heading)
- **Thunk Unit Tests**: Dedicated tests for `fetchThreads`, `fetchThreadDetail`, `submitThread`, `submitComment`, `upVoteThread`, `downVoteThread`, `neutralVoteThread`, `upVoteComment`, `downVoteComment`, and `neutralVoteComment`
- **Reducer Unit Tests**: Coverage for initial state, direct reducers, and all thunk states

### End-to-End Testing
- **Cypress** - For E2E testing of critical user flows
- **Login Flow Testing** - Comprehensive authentication testing including:
  - Valid credentials login
  - Invalid credentials handling
  - Form validation
  - Error message display
- **Page Object Model** - Maintainable test architecture

### Storybook
- **Component Documentation** - Interactive component library
- **Button Stories** - 14 story variants covering all states
- **Input Stories** - 18 story variants for input/textarea modes

Run tests with:
```bash
npm test              # Unit tests
npm run test:e2e:open # Cypress interactive mode
npm run test:e2e      # Cypress headless mode
npm run storybook     # Component stories
```

## CI/CD Pipeline

This project implements automated Continuous Integration and Continuous Deployment:

### Continuous Integration (GitHub Actions)
- **Code Quality Check** - Runs ESLint to ensure code quality standards
- **Automated Testing** - Executes unit tests with coverage reports
- **Build Verification** - Validates that the application builds successfully
- Triggers on push and pull requests to `main`/`master` branches

### Continuous Deployment (Vercel)
- **Automatic Deployments** - Every push to `main` triggers a production deployment
- **Preview Deployments** - Pull requests generate preview environments
- **Production URL**: [https://tell-be-web.vercel.app/](https://tell-be-web.vercel.app/)

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
- **Vitest** - For unit testing (`^3.2.4`)
- **Cypress** - For end-to-end testing (`^15.2.0`)
- **Storybook** - For component documentation and testing (`^9.1.8`)

## License

Copyright (c) 2025 arieftb

This project is created for educational purposes as part of
the [Menjadi React Web Developer Expert](https://www.dicoding.com/academies/418/)
course from Dicoding.
You may use this code as a reference only.
Reusing this code for submission, plagiarism, or commercial use is strictly prohibited.