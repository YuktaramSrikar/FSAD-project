import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Target } from 'lucide-react';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="container pt-32 py-20 animate-fade-in text-center">
            <div className="flex justify-center mb-6">
                <div className="tag flex items-center gap-2">
                    <Sparkles size={16} /> <span>Discover Your True Potential</span>
                </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-4xl mx-auto" style={{ fontSize: '3rem', '@media (min-width: 768px)': { fontSize: '4.5rem' } }}>
                Navigate your future with <br className="hidden md:block" />
                <span className="text-gradient">AI-Driven Career Assessment</span>
            </h1>

            <p className="text-xl text-muted max-w-2xl mx-auto mb-12" style={{ color: 'var(--text-muted)' }}>
                Our web-based platform connects students to personalized career pathways through
                comprehensive skills analysis, while giving administrators powerful tools to track and nurture growth.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
                <button onClick={() => navigate('/login/student')} className="btn btn-primary">
                    Get Started <ArrowRight size={18} />
                </button>
                <button className="btn btn-secondary">
                    <Target size={18} /> Explore Careers
                </button>
            </div>

            <div className="mt-16 animate-float">
                <div className="glass-card max-w-5xl mx-auto p-1 overflow-hidden" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '20px', background: 'linear-gradient(120deg, rgba(79, 70, 229, 0.2), rgba(147, 51, 234, 0.2))', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)]" style={{ animation: 'pulse-glow 2s infinite' }}>
                                <Target size={32} color="white" />
                            </div>
                            <p className="text-muted text-lg font-medium">Interactive Career Mapping Engine</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
