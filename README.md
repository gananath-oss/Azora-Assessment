#App Documentation
1. App Architecture
1.1 Frontend:

Framework: React.js
Styling: Chakra UI
State Management: Context API (ItemsState)
Routing: React Router
Animations: Framer Motion
HTTP Client: Axios
1.2 Backend:

Server: Node.js with Express
Database: MongoDB
Authentication: JSON Web Tokens (JWT)
API Design: RESTful APIs
1.3 Directory Structure:

-/src: Contains all the source code for the React frontend.
-/components: Reusable UI components.
-/pages: Page components.
-/Context: Context Providers for state management.
-/styles: Styling components.

-/server: Contains backend code.
-/models: Mongoose models.
-/routes: API routes.
-/controllers: Route handlers.
-/middleware: Middleware functions.
-/config: Configuration files.

#State Management Approach
Context API (ItemsState): Provides global state management for user data, selected items, and item list.

#End points - Attache to the mail body

#Database Schema - /moded file using Mongoose create schema

#Setting Up and Running the Project Locally

Prerequisites:
Node.js (version 14 or above)
MongoDB (running locally or using MongoDB Atlas)

#For run
-/backend - npm start port:5001
-/frontend - npm start
