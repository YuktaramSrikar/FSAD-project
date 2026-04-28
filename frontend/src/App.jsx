import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import StudentDashboard from './pages/StudentDashboard';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import AdminDashboard from './pages/AdminDashboard';
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import { Briefcase, LogOut, Shield, User } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';

function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Briefcase size={28} color="hsl(var(--prism-indigo))" />
          <span>PathFinder</span>
        </Link>
        <div className="navbar-links">
          {user ? (
            <>
              {user.role === 'admin' ? (
                 <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>Admin Console</Link>
              ) : (
                <>
                  <Link to="/student" className={`nav-link ${location.pathname === '/student' ? 'active' : ''}`}>Dashboard</Link>
                  <Link to="/assessment" className={`nav-link ${location.pathname === '/assessment' ? 'active' : ''}`}>Assessment</Link>
                </>
              )}
              <button onClick={logout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LogOut size={16} /> Sign Out
              </button>
            </>
          ) : (
            <>
               <Link to="/login/student" className={`nav-link ${location.pathname === '/login/student' ? 'active' : ''}`}>Student Portal</Link>
               <Link to="/login/admin" className={`nav-link ${location.pathname === '/login/admin' ? 'active' : ''}`}>
                <Shield size={16} style={{ marginRight: '4px' }} /> Admin
               </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function ProtectedRoute({ children, allowedRole }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="flex-center" style={{ height: '50vh' }}>Loading Secure Environment...</div>;

  if (!user) {
    const loginPath = allowedRole === 'admin' ? '/login/admin' : '/login/student';
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="container animate-up">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/student" element={
               <ProtectedRoute allowedRole="student">
                  <StudentDashboard />
               </ProtectedRoute>
            } />
            <Route path="/assessment" element={
                <ProtectedRoute allowedRole="student">
                    <Assessment />
                </ProtectedRoute>
            } />
            <Route path="/results" element={
                <ProtectedRoute allowedRole="student">
                   <Results />
                </ProtectedRoute>
            } />
            <Route path="/admin" element={
                <ProtectedRoute allowedRole="admin">
                   <AdminDashboard />
                </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
