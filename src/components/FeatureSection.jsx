import React from 'react';
import { BookOpen, LineChart, Users, Settings, Target, Compass } from 'lucide-react';

const FeatureCard = ({ title, description, icon: Icon, delay }) => (
    <div className={`glass-card p-8 animate-fade-in delay-${delay}`}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-[0_4px_15px_rgba(79,70,229,0.3)] text-white" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
            <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted leading-relaxed" style={{ color: 'var(--text-muted)' }}>{description}</p>
    </div>
);

const FeatureSection = () => {
    const studentFeatures = [
        {
            title: "Comprehensive Assessments",
            description: "Take AI-driven personality and aptitude tests to uncover your hidden strengths and ideal career matches.",
            icon: BookOpen,
            delay: "100"
        },
        {
            title: "Personalized Roadmaps",
            description: "Get step-by-step career navigation plans including required skills, certifications, and educational milestones.",
            icon: Compass,
            delay: "200"
        },
        {
            title: "Skill Gap Analysis",
            description: "Identify exactly what you need to learn to land your dream job with our interactive skill tracking dashboard.",
            icon: Target,
            delay: "300"
        }
    ];

    const adminFeatures = [
        {
            title: "Student Progress Tracking",
            description: "Monitor individual and cohort progress through comprehensive analytics and engagement metrics.",
            icon: LineChart,
            delay: "100"
        },
        {
            title: "Assessment Management",
            description: "Create, modify, and deploy customized career assessment tests tailored to your institution's needs.",
            icon: Settings,
            delay: "200"
        },
        {
            title: "Cohort Insights",
            description: "Gain macro-level insights into trending career paths and skill distributions across your student body.",
            icon: Users,
            delay: "300"
        }
    ];

    return (
        <section className="container py-20" id="features">

            {/* Student Section */}
            <div className="mb-32" id="student">
                <div className="text-center mb-16">
                    <div className="tag tag-purple mb-4">For Students</div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Chart Your Own Course</h2>
                    <p className="text-xl text-muted max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
                        Everything you need to discover your passion and build a definitive roadmap to your dream career.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {studentFeatures.map((feat, idx) => (
                        <FeatureCard key={idx} {...feat} />
                    ))}
                </div>
            </div>

            {/* Admin Section */}
            <div id="admin">
                <div className="text-center mb-16">
                    <div className="tag mb-4">For Administrators</div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Empower Student Success</h2>
                    <p className="text-xl text-muted max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
                        Powerful oversight tools to guide students effectively and make data-driven curriculum decisions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {adminFeatures.map((feat, idx) => (
                        <FeatureCard key={idx} {...feat} />
                    ))}
                </div>
            </div>

        </section>
    );
};

export default FeatureSection;
