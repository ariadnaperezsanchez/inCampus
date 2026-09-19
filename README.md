# inCampus

inCampus is a full-stack web application designed to centralize and simplify the management of academic activities within a campus environment.

The platform provides tools for managing users, subjects, events, documents, and tutoring sessions through a modern web interface connected to a backend API.

This project was developed as part of my Web Application Development studies and demonstrates the integration of frontend and backend technologies in a complete web application.

## Features

- User authentication
- User management
- Subject management
- Academic event management
- Document management
- Tutoring session management
- Protected routes
- Backend authentication middleware
- REST API communication
- Responsive user interface
- Dashboard for accessing the main application features
- File upload functionality

## Technologies

### Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express
- REST API
- Authentication middleware

### Development Tools

- Git
- GitHub
- npm
- Visual Studio Code

## Project Structure

```text
inCampus/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   └── ...
│   └── ...
│
└── README.md
```

The application is divided into two main parts:

- **Frontend** — React application responsible for the user interface.
- **Backend** — Node.js application responsible for the API, application logic, authentication, and data management.

## Main Modules

### Users

The application includes functionality for managing users and controlling access to different parts of the platform.

### Subjects

Users can work with academic subjects and access information associated with them.

### Events

The platform includes functionality for managing academic events and activities.

### Documents

Documents can be uploaded and managed through the application.

### Tutoring

The application includes functionality related to tutoring sessions, allowing academic tutoring information to be managed from the platform.

## Installation

Clone the repository:

```bash
git clone https://github.com/ariadnaperezsanchez/inCampus.git
cd inCampus
```

> If your GitHub repository has a different name, replace the repository URL above with the correct one.

## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install the dependencies:

```bash
npm install
```

Configure the required environment variables if necessary.

Then start the backend:

```bash
npm start
```

If the project uses a development script instead:

```bash
npm run dev
```

## Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Vite will display the local URL where the frontend application is available.

## Application Architecture

The project follows a client-server architecture:

```text
React Frontend
      │
      │ HTTP / REST API
      ▼
Node.js / Express Backend
      │
      ▼
Application Data
```

The frontend handles the presentation layer and user interaction, while the backend processes requests, applies the application logic, manages authentication, and communicates with the application's data layer.

## API Structure

The backend is organized using separate components for:

```text
Routes
   ↓
Controllers
   ↓
Models
```

Middleware is used for tasks such as authentication and request processing.

This separation helps keep the backend organized and makes the application easier to maintain and extend.

## File Uploads

The application includes document upload functionality.

Uploaded files are handled by the backend and stored in the configured upload directory.

For a production environment, uploaded user files should normally be excluded from Git version control and handled through an appropriate storage system.

## Environment Variables

Sensitive configuration should not be stored directly in the repository.

If environment variables are required, create a local `.env` file and keep it excluded from Git:

```text
.env
```

An `.env.example` file can be included in the repository to document the required configuration without exposing credentials.

## Learning Objectives

This project demonstrates practical experience with:

- Full-stack web development
- React applications
- Node.js backend development
- Express APIs
- REST architecture
- Frontend and backend integration
- Authentication and authorization
- Route protection
- Application architecture
- File uploads
- Component-based frontend development
- Backend controllers and models
- npm dependency management
- Git and GitHub

## Future Improvements

Possible future improvements include:

- Improved form validation
- Extended error handling
- Automated testing
- Improved responsive design
- Additional user roles and permissions
- Improved document storage
- API documentation
- Deployment of the frontend and backend

## Purpose

inCampus was developed as an academic full-stack project to apply concepts learned during my Web Application Development studies.

The project focuses on building a structured web application with a modern frontend, a backend API, authentication, and multiple academic management features.

## Author

**Ariadna Pérez Sánchez**

GitHub: `ariadnaperezsanchez`
