import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
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
            navigate('/dashboard/admin');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-20 px-4" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-card w-full max-w-md p-8 animate-fade-in" style={{ width: '100%', maxWidth: '28rem', padding: '2rem', borderTop: '2px solid var(--secondary)' }}>

                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.3)]" style={{ background: 'linear-gradient(135deg, var(--secondary), #D8B4FE)' }}>
                            <Shield size={32} className="text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Admin Control Panel</h2>
                    <p className="text-muted" style={{ color: 'var(--text-muted)' }}>Secure authentication required</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div className="relative">
                        <label className="block text-sm font-medium mb-2 text-muted" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Admin ID</label>
                        <div className="flex items-center glass p-3 rounded-lg border border-surface-border transition-colors focus-within:border-secondary">
                            <User size={20} className="text-muted mr-3" style={{ color: 'var(--text-muted)', marginRight: '0.75rem' }} />
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-transparent border-none text-white focus:outline-none"
                                style={{ width: '100%', background: 'transparent', border: 'none', color: 'white', outline: 'none' }}
                                placeholder="admin.id"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium mb-2 text-muted" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Security Key (Password)</label>
                        <div className="flex items-center glass p-3 rounded-lg border border-surface-border transition-colors focus-within:border-secondary">
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
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary w-full mt-4"
                        style={{ width: '100%', marginTop: '1rem', background: 'linear-gradient(135deg, var(--secondary), #7E22CE)', opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
                    >
                        {isLoading ? 'Verifying...' : (
                            <>Authorize Access <ArrowRight size={18} /></>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-surface-border text-center text-xs text-muted" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Unauthorized access to this panel is prohibited and logged.
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
