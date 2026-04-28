import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass, Target, Rocket, ShieldCheck, Briefcase } from 'lucide-react';

export default function Home() {
    return (
        <div className="animate-up">
            <section style={{ textAlign: 'center', padding: '6rem 1rem' }}>
                <h1 style={{ marginBottom: '1.5rem' }}>
                    Shape Your Future <br />
                    <span style={{ 
                        background: 'linear-gradient(to right, hsl(var(--prism-indigo)), hsl(var(--prism-cyan)))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>With PathFinder</span>
                </h1>
                
                <p style={{ maxWidth: '700px', margin: '0 auto 3rem auto', fontSize: '1.25rem', color: 'hsl(var(--text-muted))', lineHeight: '1.8' }}>
                    The world's most advanced psychometric assessment tool, designed to align your innate potential with high-impact career trajectories.
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/login/student" className="btn btn-primary" style={{ padding: '1.25rem 3rem' }}>
                        Begin Assessment <ArrowRight size={20} />
                    </Link>
                    <Link to="/login/admin" className="btn btn-secondary" style={{ padding: '1.25rem 3rem' }}>
                        <ShieldCheck size={20} /> Administrator Access
                    </Link>
                </div>
            </section>

            <div className="grid-cols-3" style={{ marginTop: '4rem' }}>
                <div className="glass-panel">
                    <h3>Cognitive Analysis</h3>
                    <p style={{ fontSize: '1rem', marginTop: '1rem' }}>Deep-dive into your cognitive strengths and behavioral patterns using industry-standard psychological frameworks.</p>
                </div>

                <div className="glass-panel">
                    <h3>Strategic Roadmap</h3>
                    <p style={{ fontSize: '1rem', marginTop: '1rem' }}>Receive a multi-phase implementation plan for your transition into high-growth industries and specialized roles.</p>
                </div>

                <div className="glass-panel">
                    <h3>Market Alignment</h3>
                    <p style={{ fontSize: '1rem', marginTop: '1rem' }}>Our algorithm cross-references your profile with real-time market demand to ensure your career choice is future-proof.</p>
                </div>
            </div>

            <footer style={{ marginTop: '8rem', padding: '4rem 0', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem' }}>
                    PathFinder
                </div>
                <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>© 2026 PathFinder Career Intelligence. All rights reserved.</p>
            </footer>
        </div>
    );
}
