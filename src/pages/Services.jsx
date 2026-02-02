import React, { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const savedServices = JSON.parse(localStorage.getItem('services'));
        if (savedServices) {
            setServices(savedServices);
        } else {
            const defaults = [
                {
                    id: 1,
                    title: 'Amazon PPC Optimization',
                    description: 'Maximize your ROI with our data-driven Amazon PPC strategies. We lower ACOS and boost organic ranking.',
                    icon: 'Briefcase'
                },
                {
                    id: 2,
                    title: 'Amazon Account Management',
                    description: 'End-to-end account handling, from listing optimization to inventory management and customer support.',
                    icon: 'User'
                },
                {
                    id: 3,
                    title: 'Google & Meta Ads',
                    description: 'Expand your reach beyond Amazon with high-converting campaigns on Google and Facebook/Instagram.',
                    icon: 'Globe'
                }
            ];
            setServices(defaults);
            localStorage.setItem('services', JSON.stringify(defaults));
        }
    }, []);

    return (
        <div className="section-padding container">
            {/* Background Blob */}
            <div className="bg-blob" style={{ top: '20%', right: '-10%' }}></div>

            <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '3rem' }}>Our <span className="text-gradient">Services</span></h1>
            <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem auto', color: 'var(--color-text-secondary)' }}>
                Comprehensive e-commerce solutions tailored to scale your brand.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {services.map(service => (
                    <div key={service.id} className="glass-card" style={{
                        padding: '2.5rem',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'default'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'var(--gradient-main)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem',
                            color: 'white',
                            boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
                        }}>
                            <Briefcase size={28} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.title}</h3>
                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
