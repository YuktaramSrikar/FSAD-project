import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, BookOpen, Target, Award, Compass, ArrowRight, PlayCircle } from 'lucide-react';

const StudentDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col pt-24 pb-12" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* Dashboard Nav */}
            <nav className="glass-nav py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(15, 23, 42, 0.95)' }}>
                <div className="container flex justify-between items-center">
                    <div className="flex items-center gap-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        <Compass size={24} className="text-secondary" />
                        <span className="text-lg font-bold text-gradient">CareerNav Student</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="hidden md:inline text-sm text-muted">student@university.edu</span>
                        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-surface-border text-sm hover:bg-white hover:bg-opacity-10 transition-colors" style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', padding: '0.5rem 1rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'white' }}>
                            <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container flex-grow animate-fade-in mt-8">

                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-2">Welcome back, Alex! 👋</h1>
                    <p className="text-muted text-lg">Your next career milestone is waiting for you.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                    <div className="glass-card p-6" style={{ background: 'linear-gradient(145deg, rgba(79, 70, 229, 0.1), rgba(15, 23, 42, 0.8))' }}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-primary bg-opacity-20 flex items-center justify-center text-primary">
                                <Target size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-muted">Current Goal</p>
                                <h3 className="font-bold">Software Engineer</h3>
                            </div>
                        </div>
                        <div className="w-full bg-surface-border rounded-full h-2 mb-2" style={{ background: 'rgba(255,255,255,0.1)' }}>
                            <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <p className="text-xs text-right text-muted">45% to milestone</p>
                    </div>

                    <div className="glass-card p-6">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-secondary bg-opacity-20 flex items-center justify-center text-secondary">
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-muted">Assessments</p>
                                <h3 className="text-2xl font-bold">3 <span className="text-sm font-normal text-muted">/ 5 Completed</span></h3>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 border border-accent">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-accent bg-opacity-20 flex items-center justify-center text-accent">
                                <Award size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-muted">Skills Unlocked</p>
                                <h3 className="text-2xl font-bold text-gradient-secondary">12 New</h3>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Action Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h2 className="text-2xl font-bold">Your Action Plan</h2>

                        <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-surface flex items-center justify-center border border-primary">
                                    <PlayCircle size={28} className="text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Aptitude Test: Advanced Logic</h4>
                                    <p className="text-sm text-muted">Estimated time: 25 mins • Required for next milestone</p>
                                </div>
                            </div>
                            <button className="btn btn-primary px-6 w-full sm:w-auto">Start Now</button>
                        </div>

                        <div className="glass p-6 text-center opacity-70">
                            <p className="text-muted">More assessments will unlock after you complete the current one.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Recommended Resources</h2>
                        <div className="glass-card p-6">
                            <ul className="space-y-4" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li className="flex gap-3 cursor-pointer hover:bg-white hover:bg-opacity-5 p-2 rounded-lg transition-colors">
                                    <ArrowRight size={18} className="text-secondary mt-1 flex-shrink-0" />
                                    <div>
                                        <h5 className="font-medium text-sm">Intro to Data Structures</h5>
                                        <p className="text-xs text-muted">Video Course • 2.5 hours</p>
                                    </div>
                                </li>
                                <li className="flex gap-3 cursor-pointer hover:bg-white hover:bg-opacity-5 p-2 rounded-lg transition-colors">
                                    <ArrowRight size={18} className="text-secondary mt-1 flex-shrink-0" />
                                    <div>
                                        <h5 className="font-medium text-sm">Resume Building Workshop</h5>
                                        <p className="text-xs text-muted">Interactive Guide • 45 mins</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default StudentDashboard;
