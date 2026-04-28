import React from 'react';
import { Compass, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-20" style={{ borderTop: '1px solid var(--surface-border)', background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(10px)' }}>
            <div className="container py-12 flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-6">
                    <Compass size={32} className="text-secondary" />
                    <span className="text-2xl font-bold text-gradient">CareerNav</span>
                </div>
                <p className="text-muted max-w-md mx-auto mb-8" style={{ color: 'var(--text-muted)' }}>
                    Empowering the next generation to discover their potential and navigate the future of work with confidence.
                </p>
                <div className="flex gap-6 mb-8">
                    <a href="#" className="transition-colors" style={{ color: 'var(--text-muted)' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}><Twitter size={24} /></a>
                    <a href="#" className="transition-colors" style={{ color: 'var(--text-muted)' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}><Linkedin size={24} /></a>
                    <a href="#" className="transition-colors" style={{ color: 'var(--text-muted)' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}><Github size={24} /></a>
                </div>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    © {new Date().getFullYear()} CareerNav Assessment Tool. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
