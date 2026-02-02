import React from 'react';

const Team = () => {
    const [teamMembers, setTeamMembers] = React.useState([]);

    React.useEffect(() => {
        const savedTeam = JSON.parse(localStorage.getItem('teamMembers') || '[]');
        if (savedTeam.length > 0) {
            setTeamMembers(savedTeam);
        } else {
            // Default placeholder if empty
            const defaults = [
                {
                    id: 1,
                    name: 'Vijay Savani',
                    role: 'Founder & Ecommerce Specialist',
                    image: 'https://via.placeholder.com/400x400',
                    bio: 'Amazon Trained Ecommerce Specialist with expertise in Google & Meta Ads. Driving sales and optimizing ROAS is my forte.'
                }
            ];
            setTeamMembers(defaults);
        }
    }, []);

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
                                src={member.image}
                                alt={member.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                }}
                                onError={(e) => {
                                    // Fallback to generated avatar if LinkedIn image fails (CORS issue)
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
