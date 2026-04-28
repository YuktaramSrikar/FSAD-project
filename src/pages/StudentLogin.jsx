import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Compass, ArrowRight } from 'lucide-react';

const StudentLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate authentication delay
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard/student');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-20 px-4" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-card w-full max-w-md p-8 animate-fade-in" style={{ width: '100%', maxWidth: '28rem', padding: '2rem' }}>

                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary bg-opacity-20 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                            <Compass size={32} className="text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Student Portal</h2>
                    <p className="text-muted" style={{ color: 'var(--text-muted)' }}>Sign in to access your assessments</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div className="relative">
                        <label className="block text-sm font-medium mb-2 text-muted" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email Address</label>
                        <div className="flex items-center glass p-3 rounded-lg border border-surface-border">
                            <User size={20} className="text-muted mr-3" style={{ color: 'var(--text-muted)', marginRight: '0.75rem' }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-transparent border-none text-white focus:outline-none"
                                style={{ width: '100%', background: 'transparent', border: 'none', color: 'white', outline: 'none' }}
                                placeholder="student@university.edu"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium mb-2 text-muted" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Password</label>
                        <div className="flex items-center glass p-3 rounded-lg border border-surface-border">
                            <Lock size={20} className="text-muted mr-3" style={{ color: 'var(--text-muted)', marginRight: '0.75rem' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-transparent border-none text-white focus:outline-none"
                                style={{ width: '100%', background: 'transparent', border: 'none', color: 'white', outline: 'none' }}
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="flex justify-end mt-2">
                            <a href="#" className="text-sm text-primary hover:text-white transition-colors text-decoration-none" style={{ fontSize: '0.875rem', color: 'var(--primary)', textDecoration: 'none' }}>Forgot password?</a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary w-full mt-4"
                        style={{ width: '100%', marginTop: '1rem', opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
                    >
                        {isLoading ? 'Authenticating...' : (
                            <>Sign In <ArrowRight size={18} /></>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-muted" style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Don't have an account? <a href="#" className="font-medium text-white hover:text-primary transition-colors text-decoration-none">Contact Administrator</a>
                </div>
            </div>
        </div>
    );
};

export default StudentLogin;
