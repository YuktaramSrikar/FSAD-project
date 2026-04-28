import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function AdminLogin() {
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
                if (data.user.role !== 'admin') {
                    setError('Access denied. This portal is for administrators only.');
                    setLoading(false);
                    return;
                }
                login(data.user, data.token);
                navigate('/admin', { replace: true });
            } else {
                setError(data.error || 'Authentication failed');
            }
        } catch (err) {
            setError('System error. Please contact infrastructure support.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container flex-center" style={{ minHeight: '80vh' }}>
            <div className="glass-panel animate-up" style={{ maxWidth: '450px', width: '100%' }}>
                <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', width: 'fit-content' }}>
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ 
                        width: '80px', 
                        height: '80px', 
                        background: 'linear-gradient(135deg, hsla(var(--prism-indigo) / 0.2), hsla(var(--prism-purple) / 0.2))',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        border: '1px solid hsla(var(--prism-indigo) / 0.3)'
                    }}>
                        <ShieldCheck size={40} color="hsl(var(--prism-indigo))" />
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Admin Portal</h2>
                    <p style={{ color: 'hsl(var(--text-muted))' }}>Secure infrastructure access</p>
                </div>
                
                {error && (
                    <div style={{ 
                        background: 'hsla(0, 80%, 60%, 0.1)', 
                        color: '#ff6b6b', 
                        padding: '1rem', 
                        borderRadius: '12px', 
                        marginBottom: '1.5rem', 
                        border: '1px solid hsla(0, 80%, 60%, 0.2)',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Administrator ID</label>
                        <input 
                            type="text" 
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Access Token</label>
                        <input 
                            type="password" 
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Authenticating...' : 'Authorize Access'}
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem', color: 'hsl(var(--text-muted))' }}>
                    Protected environment. All actions are logged.
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
