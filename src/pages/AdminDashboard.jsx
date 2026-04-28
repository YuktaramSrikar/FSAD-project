import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, Settings, BarChart3, Shield, Activity, FileText } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col pt-24 pb-12" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* Admin Nav */}
            <nav className="glass-nav py-3" style={{ borderBottom: '1px solid rgba(147,51,234,0.3)', background: 'rgba(15, 23, 42, 0.95)' }}>
                <div className="container flex justify-between items-center">
                    <div className="flex items-center gap-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        <Shield size={24} className="text-secondary" />
                        <span className="text-lg font-bold" style={{ color: '#D8B4FE' }}>CareerNav Admin</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" style={{ background: '#22c55e', boxShadow: '0 0 8px #22c55e' }}></div>
                            <span className="text-sm text-green-400">System Online</span>
                        </div>
                        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-surface-border text-sm hover:bg-white hover:bg-opacity-10 transition-colors" style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', padding: '0.5rem 1rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'white' }}>
                            <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container flex-grow animate-fade-in mt-8">

                <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 text-white">Platform Overview</h1>
                        <p className="text-muted text-lg">Manage users, assessments, and view analytics.</p>
                    </div>
                    <button className="btn btn-primary bg-secondary border-none" style={{ background: 'var(--secondary)' }}>
                        <Settings size={18} /> Manage Settings
                    </button>
                </header>

                {/* Global Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

                    <div className="glass-card p-6">
                        <div className="flex items-center gap-3 mb-4 text-muted">
                            <Users size={20} /> <span className="font-medium text-sm">Total Active Students</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-1">1,248</h3>
                        <p className="text-xs text-green-400 flex items-center gap-1"><Activity size={12} /> +12% this month</p>
                    </div>

                    <div className="glass-card p-6">
                        <div className="flex items-center gap-3 mb-4 text-muted">
                            <FileText size={20} /> <span className="font-medium text-sm">Assessments Taken</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-1">8,492</h3>
                        <p className="text-xs text-green-400 flex items-center gap-1"><Activity size={12} /> +5% this week</p>
                    </div>

                    <div className="glass-card p-6">
                        <div className="flex items-center gap-3 mb-4 text-muted">
                            <Target size={20} /> <span className="font-medium text-sm">Avg. Match Rate</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-1 text-gradient-secondary">76%</h3>
                        <p className="text-xs text-muted">Across all cohorts</p>
                    </div>

                    <div className="glass-card p-6" style={{ background: 'linear-gradient(145deg, rgba(147, 51, 234, 0.1), rgba(15, 23, 42, 0.8))' }}>
                        <div className="flex items-center gap-3 mb-4 text-secondary">
                            <BarChart3 size={20} /> <span className="font-medium text-sm">System Health</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-1">99.9%</h3>
                        <p className="text-xs text-muted">Uptime this period</p>
                    </div>

                </div>

                {/* Admin Tools Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <div className="glass-card p-8">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Settings size={20} className="text-secondary" /> Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex flex-col items-center justify-center p-6 glass rounded-xl hover:bg-white hover:bg-opacity-5 transition-all text-center gap-3" style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', cursor: 'pointer', color: 'white' }}>
                                <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center text-primary"><FileText size={20} /></div>
                                <span className="font-medium text-sm">Create Assessment</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-6 glass rounded-xl hover:bg-white hover:bg-opacity-5 transition-all text-center gap-3" style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', cursor: 'pointer', color: 'white' }}>
                                <div className="w-10 h-10 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center text-secondary"><Users size={20} /></div>
                                <span className="font-medium text-sm">Manage Users</span>
                            </button>
                        </div>
                    </div>

                    <div className="glass-card p-8">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Activity size={20} className="text-primary" /> Recent Activity</h2>
                        <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="flex justify-between items-center border-b border-surface-border pb-3">
                                <div>
                                    <p className="font-medium text-sm">Batch import completed</p>
                                    <p className="text-xs text-muted">Cohort 2026</p>
                                </div>
                                <span className="text-xs text-muted">2 mins ago</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-surface-border pb-3">
                                <div>
                                    <p className="font-medium text-sm">New Assessment published</p>
                                    <p className="text-xs text-muted">Tech Skills v2</p>
                                </div>
                                <span className="text-xs text-muted">1 hour ago</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-sm flex items-center gap-2 text-red-400" style={{ color: '#f87171' }}>System alert resolved</p>
                                    <p className="text-xs text-muted">Database sync issue</p>
                                </div>
                                <span className="text-xs text-muted">3 hours ago</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
