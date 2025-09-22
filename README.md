# NextJS Full-Stack Website

A modern full-stack web application with separate frontend, backend, and database layers.

## Project Structure

```
nextjs-website/
├── frontend/          # Next.js React application
├── backend/           # Backend API (to be implemented)
├── database/          # Database configuration and migrations
└── README.md          # This file
```

## Frontend

The frontend is built with:
- **Next.js 15.5.3** with App Router
- **React 19.1.0**
- **TypeScript**
- **Tailwind CSS v4**
- **Firebase** integration
- **Turbopack** for fast development

### Frontend Development

Navigate to the frontend directory and run:

```bash
cd frontend
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Backend

Backend implementation to be added. This will likely include:
- RESTful API endpoints
- Authentication
- Business logic
- Firebase Admin SDK integration

## Database

Database layer to be implemented. This will include:
- Firebase Firestore configuration
- Database schema
- Migration scripts
- Seed data

## Firebase Integration

Firebase SDK has been installed in the frontend. To complete Firebase setup:

1. Create a Firebase project at https://console.firebase.google.com
2. Enable required services (Firestore, Authentication, etc.)
3. Download the Firebase config and add to your environment variables
4. Initialize Firebase in your application

## Getting Started

1. Clone the repository
2. Install dependencies in each module:
   ```bash
   cd frontend && npm install
   ```
3. Set up your Firebase configuration
4. Start the development server

## Contributing

This is a monorepo structure that allows for independent development of frontend, backend, and database components while maintaining them in a single repository.