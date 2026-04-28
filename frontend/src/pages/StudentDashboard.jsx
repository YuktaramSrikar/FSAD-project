import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    ClipboardList, 
    Award, 
    User, 
    ArrowRight, 
    Sparkles, 
    TrendingUp, 
    BookOpen, 
    Clock,
    LayoutDashboard,
    Zap,
    ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StudentDashboard() {
    const { user } = useAuth();
    const [name, setName] = useState(user?.full_name || user?.username || 'Explorer');

    // Mock data for insights
    const insights = [
        { title: "Top Skill", value: "Analytical Thinking", icon: <TrendingUp size={20} />, color: "hsl(var(--prism-cyan))" },
        { title: "Match Accuracy", value: "94%", icon: <Zap size={20} />, color: "hsl(var(--prism-indigo))" },
        { title: "Career Field", value: "Technology", icon: <LayoutDashboard size={20} />, color: "hsl(var(--prism-purple))" }
    ];

    const recommendedReading = [
        { title: "The Future of AI Careers", time: "5 min read", icon: <BookOpen size={16} /> },
        { title: "Developing Leadership Skills", time: "8 min read", icon: <Clock size={16} /> }
    ];

    return (
        <div className="animate-up">
            <header style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--prism-cyan))', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                    <LayoutDashboard size={16} /> Student Intelligence Hub
                </div>
                <h1 style={{ marginBottom: '0.5rem' }}>
                    Welcome, <span style={{ color: 'hsl(var(--prism-cyan))' }}>{name}</span>
                </h1>
                <p style={{ color: 'hsl(var(--text-muted))' }}>Your personalized career development ecosystem is ready.</p>
            </header>

            {/* Insight Stats */}
            <div className="grid-cols-3" style={{ marginBottom: '3rem' }}>
                {insights.map((insight, idx) => (
                    <div key={idx} className="glass-panel stat-card" style={{ padding: '1.5rem', textAlign: 'left' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div style={{ color: insight.color }}>{insight.icon}</div>
                            <Sparkles size={14} style={{ opacity: 0.3 }} />
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'Outfit' }}>{insight.value}</div>
                        <div className="stat-label" style={{ fontSize: '0.75rem' }}>{insight.title}</div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Main Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ width: '48px', height: '48px', background: 'hsla(var(--prism-indigo) / 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid hsla(var(--prism-indigo) / 0.2)' }}>
                                    <ClipboardList color="hsl(var(--prism-indigo))" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem' }}>Cognitive Assessment</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))', margin: 0 }}>Discover your innate professional strengths.</p>
                                </div>
                            </div>
                            <p style={{ marginBottom: '2rem', fontSize: '1rem' }}>
                                Our updated psychometric engine uses neural matching to find the exact industry where your skills will yield the highest impact.
                            </p>
                            <Link to="/assessment" className="btn btn-primary" style={{ width: '100%' }}>
                                Start New Analysis <ArrowRight size={18} />
                            </Link>
                        </div>
                        {/* Decorative glow */}
                        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'hsla(var(--prism-indigo) / 0.15)', borderRadius: '50%', filter: 'blur(40px)' }} />
                    </div>

                    <div className="glass-panel">
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <TrendingUp size={20} color="hsl(var(--prism-cyan))" />
                            Recent Trajectory
                        </h3>
                        <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--glass-border)', borderRadius: '16px', background: 'hsla(0, 0%, 100%, 0.02)' }}>
                            <Award size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                            <p style={{ color: 'hsl(var(--text-muted))' }}>Take your first assessment to unlock your career roadmap.</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h4 style={{ marginBottom: '1rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Career Insights</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {recommendedReading.map((item, idx) => (
                                <div key={idx} className="glass-card" style={{ padding: '1rem', cursor: 'pointer' }}>
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                        <div style={{ marginTop: '3px', color: 'hsl(var(--prism-indigo))' }}>{item.icon}</div>
                                        <div>
                                            <div style={{ fontSize: '0.9rem', fontWeight: '700', lineHeight: '1.2' }}>{item.title}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', marginTop: '0.4rem' }}>{item.time}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, hsla(var(--prism-purple) / 0.1), transparent)' }}>
                        <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Career Mastery</h4>
                        <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))', marginBottom: '1.5rem' }}>Complete assessments to earn industry-ready badges.</p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'hsla(0, 0%, 100%, 0.05)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ShieldCheck size={20} style={{ opacity: 0.1 }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
