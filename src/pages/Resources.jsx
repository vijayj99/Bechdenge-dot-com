import React, { useState, useEffect } from 'react';
import { Download, FileText, ExternalLink } from 'lucide-react';

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        const savedResources = JSON.parse(localStorage.getItem('resources'));
        if (savedResources) {
            setResources(savedResources);
        } else {
            const defaults = [
                { id: 1, title: 'Amazon PPC Audit Checklist', description: 'A comprehensive checklist to audit your PPC campaigns.', link: '#', type: 'PDF' },
                { id: 2, title: 'Keyword Research Template', description: 'Excel template for organizing your keyword research.', link: '#', type: 'Excel' }
            ];
            setResources(defaults);
            localStorage.setItem('resources', JSON.stringify(defaults));
        }
    }, []);

    const handleDownloadClick = (e, resource) => {
        e.preventDefault();
        // Check if user info is already captured (optional optimization, but user asked for compulsory so we might want to ask every time or just once per session)
        // For "compulsory login", let's ask every time or check a "isLoggedIn" flag. 
        // User asked for "detail hume mil jani chahiye", let's simple use a lead form.

        // Check if already submitted in this session to avoid annoyance? 
        // Or user wants "login" feel. Let's do simple form every time for now or check if user exists.
        const storedUser = sessionStorage.getItem('resourceUser');
        if (storedUser) {
            window.open(resource.link, '_blank');
        } else {
            setSelectedResource(resource);
            setShowModal(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone) {
            alert('Please fill all details');
            return;
        }

        // Save Inquiry
        const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
        const newInquiry = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            name: formData.name,
            email: formData.email,
            mobile: formData.phone,
            message: `Downloaded Resource: ${selectedResource.title}` // Add context
        };
        localStorage.setItem('inquiries', JSON.stringify([...inquiries, newInquiry]));

        // Save "Session" to avoid asking again immediately if desired, or skip to mimic "Login"
        sessionStorage.setItem('resourceUser', JSON.stringify(formData));

        // Close and Download
        setShowModal(false);
        window.open(selectedResource.link, '_blank');

        // Reset (keep data if needed or clear)
        // setFormData({ name: '', email: '', phone: '' }); 
    };

    return (
        <div className="section-padding container">
            <div className="bg-blob" style={{ bottom: '15%', right: '-5%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(0,0,0,0) 70%)' }}></div>

            <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '3rem' }}>Free <span className="text-gradient">Resources</span></h1>
            <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem auto', color: 'var(--color-text-secondary)' }}>
                Download our free guides, templates, and checklists to help you master e-commerce.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {resources.map(resource => (
                    <div key={resource.id} className="glass-card" style={{
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                color: 'var(--color-primary)',
                                border: '1px solid var(--color-border)'
                            }}>
                                <FileText size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'white' }}>{resource.title}</h3>
                            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                {resource.description}
                            </p>
                        </div>
                        <button
                            onClick={(e) => handleDownloadClick(e, resource)}
                            className="btn btn-secondary"
                            style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                        >
                            <Download size={18} /> Download {resource.type}
                        </button>
                    </div>
                ))}
            </div>

            {resources.length === 0 && (
                <div style={{ textAlign: 'center', padding: '6rem', color: 'var(--color-text-muted)' }}>
                    <p style={{ fontSize: '1.2rem' }}>No resources available at the moment. Check back soon!</p>
                </div>
            )}

            {/* --- Lead Capture Modal --- */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000,
                    backdropFilter: 'blur(8px)'
                }}>
                    <div className="glass-card" style={{ padding: '3rem', width: '90%', maxWidth: '450px', position: 'relative', background: 'var(--color-bg-secondary)' }}>
                        <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'white' }}>×</button>

                        <h2 style={{ marginBottom: '1rem', textAlign: 'center', fontSize: '2rem' }} className="text-gradient">Download Free Guide</h2>
                        <p style={{ marginBottom: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>Please provide your details to unlock this e-commerce resource.</p>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Full Name</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'white', outline: 'none' }} placeholder="Your name" />
                            </div>
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Work Email</label>
                                <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'white', outline: 'none' }} placeholder="email@company.com" />
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>WhatsApp Number</label>
                                <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={{ width: '100%', padding: '0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'white', outline: 'none' }} placeholder="+91" />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                                Get Instant Access <ExternalLink size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Resources;
