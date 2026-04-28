# Authentication & Security Guide

## Career Assessment Tool - Security Features

This guide explains how authentication and security work in the Career Assessment Tool.

## Overview

The Career Assessment Tool implements a secure authentication system with:
- JWT (JSON Web Token) based authentication
- Bcryptjs password hashing
- Role-based access control (Admin/Student)
- Protected API endpoints

## How Credentials Stay Hidden

### 1. Password Storage
- Passwords are **never stored in plaintext**
- Each password is hashed using bcryptjs with 10 salt rounds
- The hash is cryptographically secure and cannot be reversed
- In the database, only the hash is stored

### 2. Login Process
```
User Input:
  username: "student"
  password: "student123"
                 ↓
         Server receives request
                 ↓
   Database query for user "student"
                 ↓
   bcryptjs.compare(inputPassword, storedHash)
                 ↓
         Password matches? ✓
                 ↓
   JWT token generated (contains user info, NOT password)
                 ↓
   Token sent to frontend (password never sent back)
                 ↓
   Frontend stores only the token (never the password)
```

### 3. Frontend Storage
- **localStorage contains**: JWT token + user info (username, role)
- **localStorage DOES NOT contain**: Password
- **Network requests**: Token is sent in Authorization header, password never sent
- **Browser console**: Credentials are not logged

### 4. API Responses
When user logs in, the server responds with:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzdHVkZW50In...",
  "user": {
    "username": "student",
    "role": "student"
  }
}
```

**Notice**: The password is NOT included in the response.

### User Account Management

No default accounts are pre-created. Users must be added manually. See the "Creating User Accounts" section in README.md for instructions.

## How Authentication Works

### 1. Login (`POST /api/login`)
```javascript
// Frontend sends:
{
  "username": "student",
  "password": "student123"
}

// Backend responds with:
{
  "token": "JWT_TOKEN_HERE",
  "user": { "username": "student", "role": "student" }
}
```

### 2. Protected Requests
After login, the token is used for protected endpoints:

```javascript
// Frontend sends:
fetch('http://localhost:5000/api/submit', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer JWT_TOKEN_HERE',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ studentName, answers })
})
```

### 3. Backend Verification
The backend:
1. Extracts the JWT token from the Authorization header
2. Verifies the token signature using JWT_SECRET
3. Checks the user's role (admin/student)
4. Allows or denies access based on role

## Protected Endpoints

### Student Endpoints
- `POST /api/submit` - Submit assessment answers
  - Requires: Valid JWT token with role "student"
  - Returns: Career recommendation and result ID

### Admin Endpoints
- `GET /api/admin/metrics` - View statistics
  - Requires: Valid JWT token with role "admin"
  - Returns: Total assessments, career distribution

### Public Endpoints
- `GET /api/questions` - Get all assessment questions
- `POST /api/login` - User login

## JWT Token Structure

A JWT token looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzdHVkZW50In...`

It contains three parts separated by dots:

1. **Header** - Algorithm info
2. **Payload** - User info (ID, username, role) - **NOT password**
3. **Signature** - Cryptographic signature using JWT_SECRET

Example payload:
```json
{
  "id": 1,
  "username": "student",
  "role": "student",
  "iat": 1234567890,
  "exp": 1234571490
}
```

**The token expires in 1 hour** for security.

## Security Features

✅ **Passwords Hashed**: Using bcryptjs (not reversible)
✅ **JWT Tokens**: Secure token-based authentication
✅ **Token Expiration**: Tokens expire in 1 hour
✅ **Role-Based Access**: Admin/Student have different permissions
✅ **Protected Routes**: frontend prevents unauthorized access
✅ **Backend Validation**: Server verifies every request
✅ **No Plaintext**: Passwords never stored or transmitted in plaintext

## Environment Variables

The `.env` file (not committed to git) contains:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=career_assessment
PORT=5000
JWT_SECRET=your_secret_key_change_in_production
```

**`.env` is in `.gitignore`** - it's never committed to version control.

The `.env.example` file shows what variables are needed without sensitive data.

## Security Best Practices

### Current Implementation
- ✅ Passwords are hashed and salted
- ✅ JWT tokens for stateless authentication
- ✅ Role-based access control
- ✅ Token expiration
- ✅ Protected API endpoints

### Production Recommendations
1. **Change JWT_SECRET** to a strong random string
2. **Create Strong Accounts** - ensure admin accounts have strong passwords
3. **Use HTTPS** - all communication should be encrypted
4. **Implement Rate Limiting** - prevent brute force attacks on login
5. **Add CSRF Protection** - use CSRF tokens for state-changing requests
6. **Use Secure Cookies** - consider using httpOnly, secure cookies instead of localStorage
7. **Password Reset** - implement password reset functionality
8. **Audit Logging** - log important actions
9. **Database Backups** - regular backups of encrypted data
10. **Input Validation** - validate all user inputs

## Troubleshooting

### "Invalid username or password"
- Username or password entered incorrectly
- User doesn't exist in database
- Create a user account using the create-user.js script

### "403 Access Denied"
- JWT token may be expired
- Try logging out and logging back in
- Check browser localStorage - token should be present

### "Admin Dashboard shows error"
- Token might not be sent in request
- Backend might be down
- Check browser developer tools (Network tab)

## Files Related to Authentication

- **Backend**:
  - `backend/routes/api.js` - Login endpoint and JWT verification
  - `backend/database.js` - User table and credential seeding
  - `backend/.env` - Configuration with JWT_SECRET

- **Frontend**:
  - `frontend/src/context/AuthContext.jsx` - Auth state management
  - `frontend/src/pages/Login.jsx` - Login page
  - `frontend/src/pages/AdminDashboard.jsx` - Protected admin page
  - `frontend/src/pages/Assessment.jsx` - Protected assessment submission
  - `frontend/src/App.jsx` - Route protection with ProtectedRoute component
