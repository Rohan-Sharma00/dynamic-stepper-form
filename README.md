# Dynamic Stepper Form

A full-stack application that allows users to create, save, and complete dynamic multi-step forms. Form configuration is managed from the backend, making it easy to add or modify forms without changing frontend code.

## Live Links

Frontend:
https://dynamic-stepper-form.vercel.app/

Backend:
https://dynamic-stepper-form.onrender.com/

API Example:
https://dynamic-stepper-form.onrender.com/api/submissions

## Tech Stack

### Frontend

* React
* Vite
* Material UI
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

---

# Features

## Dynamic Form Configuration

Forms are fully configurable from the backend.

Each form can contain:

* Multiple steps
* Text fields
* Select fields
* Radio fields
* Required fields
* Field validations

No frontend code changes are required to create new forms.

---

## Create New Submission

Users can:

* Select a form
* Start a new submission
* Fill data step by step

---

## Save Draft

Users can:

* Save progress at any step
* Continue later from the same step
* Preserve previously entered answers

Draft data is stored in MongoDB.

---

## Resume Draft

Users can:

* Open existing draft submissions
* Continue from the last saved step
* Update answers

---

## Complete Submission

Users can:

* Submit completed forms
* View completed submissions
* Track submission status

---

## Progress Tracking

Each submission stores:

* Current step
* Completed steps
* Submission status

Example:

2 / 3 Steps Completed

---

## Submission Listing

View all submissions with:

* Form title
* Status
* Progress
* Created date

---

## Dynamic Question Types

Supported field types:

### Text

Example:

* Name
* Address

### Select

Example:

* Qualification
* Institution Type

### Radio

Example:

* Gender
* Yes / No Questions

---

## Validations

### Frontend Validation

* Required fields
* Field-level validations
* Invalid inputs blocked

### Backend Validation

* Invalid form ID handling
* Invalid step handling
* Invalid submission handling
* Required field validation
* Invalid option validation
* Broken form configuration handling

---

# Backend APIs

## Forms

### Get All Forms

```http
GET /api/forms
```

Returns all available form configurations.

---

## Submissions

### Create Submission

```http
POST /api/submissions
```

Creates a new submission.

---

### Get All Submissions

```http
GET /api/submissions
```

Returns all submissions.

---

### Get Submission By Id

```http
GET /api/submissions/:id
```

Returns a single submission.

---

### Save Draft

```http
PUT /api/submissions/:id/draft
```

Updates draft progress.

---

### Complete Submission

```http
PUT /api/submissions/:id/submit
```

Marks submission as completed.

---

### Delete Submission

```http
DELETE /api/submissions/:id
```

Deletes a submission.

---

# Database Design

## Form Collection

Stores:

* Form title
* Description
* Steps
* Questions
* Validation rules

---

## Submission Collection

Stores:

* Form reference
* Answers
* Current step
* Completed steps
* Status
* Created date
* Updated date

---

# Security & Reliability

## CORS Protection

Allowed frontend domains are configured using CORS.

---

## Rate Limiting

API rate limiting prevents abuse and excessive requests.

---

## Helmet Security

Helmet is used to secure HTTP headers.

---

## Error Handling

Centralized error handling for:

* Invalid requests
* Invalid form IDs
* Invalid submissions
* Missing resources

---

# Performance Optimizations

* MongoDB indexing
* Optimized listing queries
* Form title population only when needed
* Lean query support for listing APIs

---

# Local Setup

## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Environment Variables

## Backend

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Frontend

```env
VITE_API_BASE_URL=https://dynamic-stepper-form.onrender.com/api
```

---

# Future Improvements

* Unsaved changes warning
* Search and filtering
* Pagination
* User authentication
* Role-based access control
* Form analytics
