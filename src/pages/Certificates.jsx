import React, { useState, useEffect } from 'react';

// Placeholder mock data for certificates
// const certificates = [
//     { id: 1, title: 'Amazon Trained Ecommerce Specialist', issuer: 'Amazon', image: 'https://via.placeholder.com/600x400?text=Amazon+Certified' },
//     { id: 2, title: 'Google Ads Search Certification', issuer: 'Google', image: 'https://via.placeholder.com/600x400?text=Google+Ads' },
//     { id: 3, title: 'Meta Certified Digital Marketing Associate', issuer: 'Meta', image: 'https://via.placeholder.com/600x400?text=Meta+Certified' },
// ];

const Certificates = () => {
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        const savedCerts = JSON.parse(localStorage.getItem('certificates'));
        if (savedCerts) {
            setCertificates(savedCerts);
        } else {
            const defaults = [
                { id: 1, title: 'Amazon Trained Ecommerce Specialist', issuer: 'Amazon', image: 'https://via.placeholder.com/600x400?text=Amazon+Certified' },
                { id: 2, title: 'Google Ads Search Certification', issuer: 'Google', image: 'https://via.placeholder.com/600x400?text=Google+Ads' },
                { id: 3, title: 'Meta Certified Digital Marketing Associate', issuer: 'Meta', image: 'https://via.placeholder.com/600x400?text=Meta+Certified' },
            ];
            setCertificates(defaults);
            localStorage.setItem('certificates', JSON.stringify(defaults));
        }
    }, []);

    return (
        <div className="section-padding container">
            {/* Background Blob */}
            <div className="bg-blob" style={{ top: '15%', left: '-10%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0,0,0,0) 70%)' }}></div>

            <h1 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '3rem' }}>My <span className="text-gradient">Certifications</span></h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {certificates.map(cert => (
                    <div key={cert.id} className="glass-card" style={{
                        overflow: 'hidden',
                        cursor: 'pointer',
                        padding: '0' // Reset padding to allow image to cover top
                    }}>
                        <img src={cert.image} alt={cert.title} style={{ width: '100%', height: '220px', objectFit: 'cover', borderBottom: '1px solid var(--color-border)' }} />
                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'white' }}>{cert.title}</h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Issued by: {cert.issuer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Certificates;
