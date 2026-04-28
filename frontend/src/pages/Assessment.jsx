import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Brain, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Assessment() {
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/questions')
            .then(res => res.json())
            .then(data => {
                setQuestions(data.questions || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load questions:', err);
                setLoading(false);
            });
    }, []);

    const handleSelect = (value) => {
        const question = questions[currentIdx];
        const updatedAnswers = {
            ...answers,
            [question.category]: (answers[question.category] || 0) + value
        };

        setAnswers(updatedAnswers);

        if (currentIdx < questions.length - 1) {
            setTimeout(() => setCurrentIdx(currentIdx + 1), 300);
        } else {
            setSubmitting(true);
            const token = localStorage.getItem('token');
            
            fetch('http://localhost:5000/api/submit', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    answers: updatedAnswers
                })
            })
                .then(res => res.json())
                .then(data => {
                    navigate('/results', { state: { answers: updatedAnswers, careerPath: data.careerPath } });
                })
                .catch(err => {
                    console.error('Submit error:', err);
                    setSubmitting(false);
                });
        }
    };

    if (loading) return (
        <div className="flex-center" style={{ height: '60vh' }}>
            <div style={{ textAlign: 'center' }}>
                <Brain className="animate-spin" size={48} color="hsl(var(--prism-cyan))" />
                <p style={{ marginTop: '1rem', color: 'hsl(var(--text-muted))' }}>Loading Psychometric Framework...</p>
            </div>
        </div>
    );

    if (submitting) return (
        <div className="flex-center" style={{ height: '60vh' }}>
            <div style={{ textAlign: 'center' }}>
                <Sparkles className="animate-spin" size={48} color="hsl(var(--prism-indigo))" />
                <p style={{ marginTop: '1rem', color: 'hsl(var(--prism-indigo))', fontWeight: '700' }}>Analyzing Responses...</p>
                <p style={{ color: 'hsl(var(--text-muted))', marginTop: '0.5rem' }}>Our algorithm is calculating your ideal trajectory.</p>
            </div>
        </div>
    );

    if (!questions.length) return (
        <div className="flex-center" style={{ height: '60vh' }}>
            <div className="glass-panel" style={{ textAlign: 'center' }}>
                <h3>No data stream available.</h3>
                <p>Please check system configuration.</p>
            </div>
        </div>
    );

    const progress = ((currentIdx) / questions.length) * 100;

    return (
        <div className="animate-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    color: 'hsl(var(--prism-cyan))', 
                    fontWeight: '700', 
                    fontSize: '0.8rem', 
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginBottom: '1rem'
                }}>
                    <Brain size={16} /> Cognitive Assessment Mode
                </div>
                <h1>Analysis Phase</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ flex: 1, height: '6px', background: 'hsla(0, 0%, 100%, 0.05)', borderRadius: '100px', overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, hsl(var(--prism-cyan)), hsl(var(--prism-indigo)))', transition: 'width 0.4s ease' }} />
                    </div>
                    <span style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))', fontWeight: '600', minWidth: '100px' }}>
                        {currentIdx + 1} / {questions.length} Concepts
                    </span>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '4rem 3rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '3rem', textAlign: 'center', lineHeight: '1.4' }}>
                    {questions[currentIdx].text}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {[
                        { label: 'Highly Resonate', value: 3 },
                        { label: 'Somewhat Resonate', value: 2 },
                        { label: 'Neutral', value: 1 },
                        { label: 'Minor Misalignment', value: 0 },
                        { label: 'Strong Misalignment', value: -1 }
                    ].map((opt, i) => (
                        <button
                            key={opt.label}
                            className="option-btn"
                            onClick={() => handleSelect(opt.value)}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <span>{opt.label}</span>
                            <ChevronRight size={18} style={{ opacity: 0.5 }} />
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center', color: 'hsl(var(--text-muted))', fontSize: '0.85rem' }}>
                <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                Your responses are used strictly for career path recommendation.
            </div>
        </div>
    );
}
