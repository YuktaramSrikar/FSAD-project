import { useState, useEffect } from 'react';
import { 
    BarChart3, 
    Users, 
    PieChart, 
    Activity, 
    ShieldCheck, 
    Download, 
    Zap, 
    Clock, 
    TrendingUp,
    AlertCircle,
    Database,
    Cpu,
    Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
    const { user } = useAuth();
    const [metrics, setMetrics] = useState({ totalParticipants: 0, careerDistribution: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:5000/api/admin/metrics', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch metrics');
                return res.json();
            })
            .then(data => {
                setMetrics(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Authentication error. Please re-login.');
                setLoading(false);
            });
    }, []);

    // Defensive check for topCareer calculation
    let topCareer = 'Strategic Growth';
    try {
        if (metrics?.careerDistribution?.length > 0) {
            topCareer = metrics.careerDistribution.reduce((prev, current) => (prev.count > current.count) ? prev : current).career_path;
        }
    } catch (e) {
        console.error("Metric calculation error:", e);
    }

    const systemStatus = [
        { label: "Neural Engine", value: "Operational", icon: <Cpu size={16} /> },
        { label: "Database Sync", value: "Optimized", icon: <Database size={16} /> },
        { label: "API Latency", value: "24ms", icon: <Activity size={16} /> }
    ];

    const recentLogs = [
        { event: "New assessment submission", user: "student_04", time: "2 mins ago" },
        { event: "Admin credentials verified", user: "admin_root", time: "15 mins ago" },
        { event: "Database backup completed", user: "system", time: "1 hour ago" }
    ];

    if (loading) return (
        <div className="flex-center" style={{ height: '60vh' }}>
            <div style={{ textAlign: 'center' }}>
                <Zap className="animate-spin" size={48} color="hsl(var(--prism-indigo))" />
                <p style={{ marginTop: '1rem', color: 'hsl(var(--text-muted))', fontWeight: '600' }}>Synchronizing Admin Control Surface...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="flex-center" style={{ height: '60vh' }}>
            <div className="glass-panel" style={{ textAlign: 'center', borderColor: '#ff6b6b' }}>
                <AlertCircle size={48} color="#ff6b6b" style={{ marginBottom: '1rem' }} />
                <h3 style={{ color: '#ff6b6b' }}>Protocol Violation</h3>
                <p>{error}</p>
            </div>
        </div>
    );

    return (
        <div className="animate-up">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--prism-indigo))', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
                        <ShieldCheck size={16} /> Command Center
                    </div>
                    <h1>Executive Analytics</h1>
                    <p style={{ color: 'hsl(var(--text-muted))' }}>Unified portal for system metrics and participant intelligence.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-secondary" style={{ padding: '0.75rem 1.25rem', fontSize: '0.85rem' }}>
                        <Activity size={16} /> Health
                    </button>
                    <button className="btn btn-primary" style={{ padding: '0.75rem 1.25rem', fontSize: '0.85rem' }}>
                        <Download size={16} /> Reports
                    </button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginBottom: '2rem' }}>
                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', justifyContent: 'center' }}>
                    {systemStatus.map((sys, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'hsl(var(--text-muted))', fontSize: '0.9rem' }}>
                                <div style={{ color: 'hsl(var(--prism-indigo))' }}>{sys.icon}</div>
                                {sys.label}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '0.85rem' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }}></span>
                                {sys.value}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="glass-panel stat-card" style={{ textAlign: 'left', padding: '1.5rem', background: 'linear-gradient(135deg, hsla(var(--prism-indigo) / 0.1), transparent)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <Users size={24} color="hsl(var(--prism-indigo))" />
                            <TrendingUp size={16} color="#4ade80" />
                        </div>
                        <div className="stat-value" style={{ fontSize: '2.5rem' }}>{metrics?.totalParticipants || 0}</div>
                        <div className="stat-label">Verified Participants</div>
                    </div>

                    <div className="glass-panel stat-card" style={{ textAlign: 'left', padding: '1.5rem', background: 'linear-gradient(135deg, hsla(var(--prism-cyan) / 0.1), transparent)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <PieChart size={24} color="hsl(var(--prism-cyan))" />
                            <Sparkles size={16} style={{ opacity: 0.3 }} />
                        </div>
                        <div className="stat-value" style={{ fontSize: '1.25rem', height: '2.5rem', display: 'flex', alignItems: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {topCareer}
                        </div>
                        <div className="stat-label">Dominant Trajectory</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                <div className="glass-panel">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <BarChart3 size={20} color="hsl(var(--prism-indigo))" />
                            Distribution
                        </h3>
                        <div style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', background: 'hsla(0, 0%, 100%, 0.05)', padding: '0.25rem 0.75rem', borderRadius: '100px' }}>
                            Live Updates
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {(!metrics?.careerDistribution || metrics.careerDistribution.length === 0) ? (
                            <div style={{ textAlign: 'center', padding: '5rem', color: 'hsl(var(--text-muted))', border: '1px dashed var(--glass-border)', borderRadius: '24px' }}>
                                No analytical data flowing.
                            </div>
                        ) : (
                            metrics.careerDistribution.map((item, index) => {
                                const percentage = metrics.totalParticipants > 0 ? (item.count / metrics.totalParticipants) * 100 : 0;
                                return (
                                    <div key={item.career_path} style={{ background: 'hsla(0, 0%, 100%, 0.02)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                            <span style={{ fontWeight: '800', fontSize: '0.9rem', letterSpacing: '0.05em' }}>{item.career_path.toUpperCase()}</span>
                                            <span style={{ color: 'hsl(var(--prism-cyan))', fontWeight: '800', fontSize: '0.9rem' }}>{item.count}</span>
                                        </div>
                                        <div style={{ width: '100%', height: '6px', background: 'hsla(0, 0%, 100%, 0.05)', borderRadius: '100px', overflow: 'hidden' }}>
                                            <div style={{ 
                                                width: `${percentage}%`, 
                                                height: '100%', 
                                                background: `linear-gradient(90deg, hsl(var(--prism-indigo)), hsl(var(--prism-cyan)))`,
                                                borderRadius: '100px'
                                            }} />
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={18} color="hsl(var(--prism-purple))" />
                        Activity
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recentLogs.map((log, idx) => (
                            <div key={idx} style={{ padding: '1rem', borderBottom: idx !== recentLogs.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.25rem' }}>{log.event}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>
                                    <span>{log.user}</span>
                                    <span>{log.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-secondary" style={{ width: '100%', marginTop: '2rem', fontSize: '0.8rem' }}>
                        Audit Logs
                    </button>
                </div>
            </div>
        </div>
    );
}
