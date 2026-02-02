import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { ArrowRight, Star, Play, Calendar, TrendingUp, Users, Award } from 'lucide-react';

const Home = () => {
    const [upcomingEvent, setUpcomingEvent] = useState(null);
    const [successStories, setSuccessStories] = useState([]);
    const [content, setContent] = useState({
        homeTitle: 'Scale Your Brand with <span class="text-gradient">Data-Driven</span> Strategies',
        homeSubtitle: 'Expert Amazon, Google, and Meta ads management to maximize your ROAS and dominate your market niche.'
    });

    useEffect(() => {
        const events = JSON.parse(localStorage.getItem('events') || '[]');
        if (events.length > 0) setUpcomingEvent(events[0]);

        const savedContent = JSON.parse(localStorage.getItem('siteContent') || '{}');
        if (savedContent.homeTitle || savedContent.homeSubtitle) {
            setContent(prev => ({ ...prev, ...savedContent }));
        }

        const savedStories = JSON.parse(localStorage.getItem('successStories') || '[]');
        if (savedStories.length > 0) {
            setSuccessStories(savedStories);
        } else {
            setSuccessStories([
                { id: 1, rating: 5, quote: "Our sales doubled within two months. The ROI focus is unmatched.", name: "Sarah J.", role: "Founder, GlowClean" },
                { id: 2, rating: 5, quote: "Vijay's team completely turned around our PPC campaigns.", name: "Rahul M.", role: "Director, TechGadgets" },
                { id: 3, rating: 5, quote: "Professional, data-backed, and results-oriented. Highly recommend.", name: "Anita S.", role: "CMO, FashionHub" }
            ]);
        }
    }, []);

    return (
        <div style={{ overflowX: 'hidden' }}>
            <Seo
                title="Home"
                description={content.homeSubtitle}
                keywords="Amazon PPC, Ecommerce Consultant, Vijay Savani, Google Ads, Meta Ads"
            />

            {/* Background Blob Animation */}
            <div className="bg-blob" style={{ top: '-10%', left: '-10%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)' }}></div>
            <div className="bg-blob" style={{ bottom: '10%', right: '-10%', background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(0,0,0,0) 70%)', animationDelay: '2s' }}></div>

            {/* Hero Section */}
            <div className="section-padding" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '120px' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

                    {/* Hero Text */}
                    <div style={{ maxWidth: '600px' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(99, 102, 241, 0.1)',
                            border: '1px solid rgba(99, 102, 241, 0.2)',
                            borderRadius: '50px',
                            marginBottom: '1.5rem',
                            color: 'var(--color-primary)',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                        }}>
                            <span style={{ width: '8px', height: '8px', background: 'var(--color-primary)', borderRadius: '50%' }}></span>
                            Available for new projects
                        </div>
                        <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: '1.1' }} dangerouslySetInnerHTML={{ __html: content.homeTitle }}></h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                            {content.homeSubtitle}
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link to="/booking" className="btn btn-primary">
                                Book a Consultation <ArrowRight size={18} />
                            </Link>
                            <Link to="/services" className="btn btn-secondary">
                                View Services
                            </Link>
                        </div>

                        {/* Social Proof Mini */}
                        <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '2rem', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', color: 'white' }}>500+</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Clients Scaled</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', color: 'white' }}>$10M+</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Ad Spend Managed</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Visual */}
                    <div className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
                        {/* Decorative Elements */}
                        <div style={{ position: 'absolute', top: '20px', right: '20px', padding: '1rem', background: '#1e293b', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)', zIndex: 2 }}>
                            <TrendingUp color="#10b981" size={24} />
                            <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: 'bold' }}>ROAS +300%</div>
                        </div>

                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'rgba(99,102,241,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <TrendingUp size={20} color="var(--color-primary)" />
                                    </div>
                                    <span style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: '600' }}>+127.5%</span>
                                </div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Sales Velocity</h3>
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{ width: '75%', height: '100%', background: 'var(--gradient-main)' }}></div>
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'rgba(236,72,153,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Users size={20} color="var(--color-secondary)" />
                                    </div>
                                    <span style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: '600' }}>+43.2%</span>
                                </div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Customer Retention</h3>
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{ width: '60%', height: '100%', background: 'var(--color-secondary)' }}></div>
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Award size={20} color="var(--color-accent)" />
                                    </div>
                                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Top 1%</span>
                                </div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Market Positioning</h3>
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{ width: '92%', height: '100%', background: 'var(--color-accent)' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Highlight */}
            <div className="section-padding" style={{ background: 'var(--color-bg-secondary)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{ color: 'var(--color-primary)', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>What We Do</span>
                        <h2 style={{ fontSize: '2.5rem', marginTop: '1rem' }}>Comprehensive Growth Solutions</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            { title: 'Amazon PPC', icon: '🛒', desc: 'Precision targeting to lower ACOS and boost organic ranking.' },
                            { title: 'Google Ads', icon: '🔍', desc: 'Capture high-intent search traffic with optimized campaign structures.' },
                            { title: 'Meta Ads', icon: '🚀', desc: 'Scale brand awareness and retargeting with creative-first strategies.' },
                        ].map((service, index) => (
                            <div key={index} className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{service.icon}</div>
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{service.title}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>{service.desc}</p>
                                <Link to="/services" style={{ color: 'var(--color-primary)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                    Learn More <ArrowRight size={16} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="section-padding container">
                <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>Success Stories</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {successStories.map((story) => (
                        <div key={story.id} className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.5rem' }}>
                                {[...Array(story.rating || 5)].map((_, i) => (
                                    <Star key={i} size={18} fill="#fbbf24" color="#fbbf24" />
                                ))}
                            </div>
                            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6', fontStyle: 'italic', color: 'var(--color-text-primary)' }}>
                                "{story.quote}"
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '45px', height: '45px', background: 'var(--gradient-main)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                    {story.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{story.name}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{story.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Events Section - Modernized */}
            <div className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
                <div className="container">
                    <div className="glass-card" style={{ padding: '3rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3rem', position: 'relative', overflow: 'hidden' }}>
                        {/* Background Effect */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, rgba(99,102,241,0.1) 0%, rgba(0,0,0,0) 100%)', zIndex: -1 }}></div>

                        <div style={{ flex: '1 1 400px' }}>
                            <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                LIVE SESSION
                            </div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                                {upcomingEvent ? upcomingEvent.title : "Upcoming Masterclass: E-commerce Domination"}
                            </h2>
                            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                                {upcomingEvent ? `${upcomingEvent.date} • ${upcomingEvent.time}` : "Join us for an exclusive deep dive into advanced Amazon PPC strategies that are working right now."}
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <Link to="/events" className="btn btn-primary">Reserve Your Spot</Link>
                                <button className="btn btn-secondary"><Calendar size={18} /> Add to Calendar</button>
                            </div>
                        </div>

                        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
                            <div style={{ width: '100%', height: '300px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)', position: 'relative' }}>
                                <Play size={48} fill="white" color="white" style={{ opacity: 0.8 }} />
                                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: 'white', fontSize: '0.9rem' }}>Preview Session</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
