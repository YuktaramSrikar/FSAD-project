import { useLocation, Link } from 'react-router-dom';
import { Rocket, ArrowRight, Share2, Award, Target, Briefcase } from 'lucide-react';

export default function Results() {
    const location = useLocation();
    const careerPath = location.state?.careerPath || 'Strategic Intelligence';

    return (
        <div className="animate-up" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="glass-panel" style={{ padding: '5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                {/* Decorative Elements */}
                <div style={{ 
                    position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', 
                    background: 'hsla(var(--prism-indigo) / 0.1)', borderRadius: '50%', filter: 'blur(60px)' 
                }} />
                <div style={{ 
                    position: 'absolute', bottom: '-100px', left: '-100px', width: '300px', height: '300px', 
                    background: 'hsla(var(--prism-cyan) / 0.1)', borderRadius: '50%', filter: 'blur(60px)' 
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                        width: '80px', height: '80px', background: 'hsla(var(--prism-indigo) / 0.2)', 
                        borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        margin: '0 auto 2rem auto', border: '1px solid hsla(var(--prism-indigo) / 0.3)',
                        boxShadow: '0 0 40px hsla(var(--prism-indigo) / 0.3)'
                    }}>
                        <Award size={40} color="hsl(var(--prism-indigo))" />
                    </div>

                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Assessment Verified</h2>
                    <p style={{ color: 'hsl(var(--text-muted))', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                        Our analysis engine has successfully matched your cognitive profile with a high-impact trajectory.
                    </p>

                    <div style={{ 
                        background: 'hsla(0, 0%, 100%, 0.03)', 
                        padding: '3rem 2rem', 
                        borderRadius: '24px', 
                        border: '1px solid var(--glass-border)',
                        marginBottom: '4rem',
                        display: 'inline-block',
                        minWidth: '300px'
                    }}>
                        <div style={{ textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.2em', color: 'hsl(var(--prism-indigo))', fontWeight: '800', marginBottom: '1rem' }}>
                            Optimal Career Path
                        </div>
                        <div style={{ 
                            fontSize: '3.5rem', 
                            fontWeight: '900', 
                            background: 'linear-gradient(to right, #fff, hsl(var(--prism-indigo)), hsl(var(--prism-cyan)))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            lineHeight: 1.1
                        }}>
                            {careerPath.toUpperCase()}
                        </div>
                    </div>

                    <div className="grid-cols-3" style={{ textAlign: 'left', gap: '1.5rem', marginBottom: '4rem' }}>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <Target size={24} color="hsl(var(--prism-indigo))" style={{ marginBottom: '1rem' }} />
                            <h4 style={{ marginBottom: '0.5rem' }}>Strategic Fit</h4>
                            <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>Aligned with your top-tier cognitive performance indicators.</p>
                        </div>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <Rocket size={24} color="hsl(var(--prism-cyan))" style={{ marginBottom: '1rem' }} />
                            <h4 style={{ marginBottom: '0.5rem' }}>Growth Potential</h4>
                            <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>High probability of professional advancement in this sector.</p>
                        </div>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <Briefcase size={24} color="hsl(var(--prism-purple))" style={{ marginBottom: '1rem' }} />
                            <h4 style={{ marginBottom: '0.5rem' }}>Industry Readiness</h4>
                            <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>Your innate skillsets match core industry requirements.</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <Link to="/student" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>
                            Enter Dashboard <ArrowRight size={18} />
                        </Link>
                        <button className="btn btn-secondary" style={{ padding: '1rem 2.5rem' }}>
                            <Share2 size={18} /> Share Results
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
