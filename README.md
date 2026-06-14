# Dynamic Stepper Form

A configurable multi-step form system built using React, Node.js, Express, and MongoDB.

## Overview

This application allows users to create, save, resume, and submit dynamic stepper forms. Form configurations are managed by the backend, enabling flexible and extensible form creation without frontend code changes.

## Features

* Dynamic multi-step forms
* Backend-managed form configuration
* Draft save and resume functionality
* Progress tracking
* Form validation
* Dynamic field rendering
* MongoDB persistence
* Config-driven architecture
* REST APIs

## Tech Stack

### Frontend

* React
* Vite
* Material UI
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Project Structure

```text
dynamic-stepper-form
|
|-- frontend
|
|-- backend
```

## Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

## API Endpoints

### Forms

```http
GET /api/forms
GET /api/forms/:id
```

### Submissions

```http
POST /api/submissions
GET /api/submissions
GET /api/submissions/:id
PATCH /api/submissions/:id/save
POST /api/submissions/:id/submit
```

## Future Improvements

* Multiple form templates
* User authentication
* File upload support
* Advanced field validations
* Analytics dashboard
* Role-based access control

## Author

Rohan Sharma
