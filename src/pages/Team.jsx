import React from 'react';
import { getTeamMembers } from '../lib/supabase';

const Team = () => {
    const [teamMembers, setTeamMembers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        fetchTeamMembers();
    }, []);

    const fetchTeamMembers = async () => {
        try {
            setLoading(true);
            const data = await getTeamMembers();

            if (data.length > 0) {
                setTeamMembers(data);
            } else {
                // Default placeholder if database is empty
                const defaults = [
                    {
                        id: 1,
                        name: 'Vijay Savani',
                        role: 'Founder & Ecommerce Specialist',
                        image_url: 'https://via.placeholder.com/400x400',
                        bio: 'Amazon Trained Ecommerce Specialist with expertise in Google & Meta Ads. Driving sales and optimizing ROAS is my forte.'
                    }
                ];
                setTeamMembers(defaults);
            }
        } catch (err) {
            console.error('Error fetching team members:', err);
            setError('Failed to load team members. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="section-padding container" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <div className="spinner" style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid rgba(236, 72, 153, 0.1)',
                        borderTop: '4px solid var(--color-primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem auto'
                    }}></div>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Loading team members...</p>
                </div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="section-padding container" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <p style={{ color: '#ef4444', fontSize: '1.2rem', marginBottom: '1rem' }}>⚠️ {error}</p>
                    <button
                        onClick={fetchTeamMembers}
                        className="cta-button"
                        style={{ background: 'var(--gradient-primary)', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', color: 'white', fontSize: '1rem' }}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="section-padding container">
            {/* Background Blob */}
            <div className="bg-blob" style={{ top: '10%', left: '-10%', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(0,0,0,0) 70%)' }}></div>

            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Meet the <span className="text-gradient">Team</span></h1>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    We are a group of passionate digital marketers and ecommerce experts dedicated to scaling your business.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {teamMembers.map((member) => (
                    <div key={member.id} className="glass-card" style={{
                        padding: '2rem',
                        textAlign: 'center',
                        transition: 'transform 0.3s ease',
                        cursor: 'pointer'
                    }}>
                        <div style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            margin: '0 auto 1.5rem auto',
                            border: '3px solid var(--color-primary)',
                            padding: '3px',
                            background: 'rgba(255,255,255,0.05)'
                        }}>
                            <img
                                src={member.image_url || member.image}
                                alt={member.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                }}
                                onError={(e) => {
                                    // Fallback to generated avatar if image fails
                                    e.target.onerror = null; // Prevent infinite loop
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=ec4899&color=fff&bold=true&format=svg`;
                                }}
                            />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{member.name}</h3>
                        <p style={{ color: 'var(--color-primary)', fontWeight: '600', marginBottom: '1rem' }}>{member.role}</p>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{member.bio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
