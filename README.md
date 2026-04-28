# Career Assessment Tool - PathFinder

A full-stack career assessment application with secure authentication for students and admins.

## 🎯 Features

- **Secure Authentication**: Student and Admin login with JWT tokens and password hashing
- **Password Security**: Passwords hashed with bcryptjs - never visible in output or network
- **Role-Based Access Control**: Separate dashboards for students and admins
- **Career Assessment Questions**: Interactive questionnaire to suggest career paths
- **Admin Dashboard**: View metrics and career distribution
- **Student Portal**: Take assessments and view personalized results
- **MySQL Database**: Persistent storage for users, questions, and results

## 🏗️ Project Structure

```
career-assessment-tool/
├── backend/                    # Express.js server
│   ├── server.js
│   ├── database.js            # MySQL setup & seeding
│   ├── routes/api.js          # API with auth
│   ├── .env                   # Configuration (credentials)
│   ├── .env.example           # Template (no sensitive data)
│   └── package.json
├── frontend/                  # React + Vite
│   ├── src/
│   │   ├── App.jsx           # Main routing
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   └── pages/
│   │       ├── Login.jsx
│   │       ├── AdminDashboard.jsx
│   │       ├── StudentDashboard.jsx
│   │       ├── Assessment.jsx
│   │       └── Results.jsx
│   └── package.json
└── AUTHENTICATION.md          # Security details
```

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
npm install
# Update .env with your database credentials if needed
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

## 🔐 Authentication

### Creating User Accounts

No default accounts are provided. Admin users must create accounts programmatically or via an admin panel (to be implemented).

**For now**, to add test accounts, you can use the `create-user.js` script:

```bash
node create-user.js admin admin_password admin
node create-user.js student student_password student
```

### How It Works

1. User submits login credentials
2. Backend verifies password against bcrypt hash
3. JWT token is generated and returned
4. Token is stored in frontend (never the password)
5. Token is sent with protected requests
6. Backend validates token and user role

### Security Features

✅ Passwords are hashed, never stored in plaintext  
✅ JWT tokens expire after 1 hour  
✅ Role-based access control (Admin/Student)  
✅ Protected API endpoints  
✅ Credentials never visible in network/console  

**For detailed security info, see [AUTHENTICATION.md](AUTHENTICATION.md)**

## 📋 API Endpoints

### Public
- `POST /api/login` - User login
- `GET /api/questions` - Get assessment questions

### Protected (Require JWT Token)
- `POST /api/submit` - Submit assessment (Students)
- `GET /api/admin/metrics` - Admin statistics (Admin only)

## 🎓 Using the Application

### Creating Test Accounts
First, create user accounts using the script:
```bash
# Create a student account
cd backend
node create-user.js testuser mypassword123 student

# Create an admin account
node create-user.js admin_user securepass admin
```

### As a Student
1. Login with your student credentials
2. Go to Student Portal
3. Click "Start Assessment"
4. Answer all questions
5. View your career recommendation

### As an Admin
1. Login with your admin credentials
2. View dashboard with statistics
3. See career distribution
4. Monitor student engagement

## 🛠️ Technologies

- **Frontend**: React 19, Vite, React Router, CSS
- **Backend**: Express.js, Node.js
- **Database**: MySQL
- **Auth**: JWT, bcryptjs
- **Tools**: ESLint, npm

## 📝 Environment Variables

Backend `.env` file (not in git):
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=career_assessment
PORT=5000
JWT_SECRET=your_secret_key_here
```

Use `.env.example` as a template for new installations.

## 🔒 Security Notes

- ✅ Passwords hashed with bcryptjs
- ✅ JWT tokens for authentication
- ✅ Token expiration (1 hour)
- ✅ Role-based access control
- ✅ Protected routes frontend & backend

For production:
- Change JWT_SECRET to a strong random string
- Create admin accounts with strong passwords
- Enable HTTPS
- Add rate limiting
- Implement CSRF protection

See [AUTHENTICATION.md](AUTHENTICATION.md) for complete security documentation.

## 📖 Full Documentation

For detailed authentication, security, and troubleshooting information, see [AUTHENTICATION.md](AUTHENTICATION.md)
