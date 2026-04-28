import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function StudentLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                login(data.user, data.token);
                navigate('/student', { replace: true });
            } else {
                setError(data.error || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('Connection error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container flex-center" style={{ minHeight: '80vh' }}>
            <div className="glass-panel animate-up" style={{ maxWidth: '450px', width: '100%' }}>
                <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', width: 'fit-content' }}>
                    <ArrowLeft size={16} /> Home
                </Link>

                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ 
                        width: '80px', 
                        height: '80px', 
                        background: 'linear-gradient(135deg, hsla(var(--prism-cyan) / 0.2), hsla(var(--prism-indigo) / 0.2))',
                        borderRadius: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        border: '1px solid hsla(var(--prism-cyan) / 0.3)',
                        boxShadow: '0 0 20px hsla(var(--prism-cyan) / 0.2)'
                    }}>
                        <User size={40} color="hsl(var(--prism-cyan))" />
                    </div>
                    <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem', fontWeight: '800' }}>Welcome Back</h2>
                    <p style={{ color: 'hsl(var(--text-muted))' }}>Continue your journey to success</p>
                </div>
                
                {error && (
                    <div style={{ 
                        background: 'hsla(0, 80%, 60%, 0.1)', 
                        color: '#ff6b6b', 
                        padding: '1rem', 
                        borderRadius: '12px', 
                        marginBottom: '1.5rem', 
                        border: '1px solid hsla(0, 80%, 60%, 0.2)',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input 
                            type="text" 
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        <Sparkles size={18} />
                        {loading ? 'Entering...' : 'Start Session'}
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>
                        Don't have an account? <span style={{ color: 'hsl(var(--prism-cyan))', cursor: 'pointer' }}>Contact your administrator</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default StudentLogin;
