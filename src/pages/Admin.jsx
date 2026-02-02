import React, { useEffect, useState } from 'react';
import { Save, Layout, MessageSquare, Image, Award, FileText, Download, Trash, Plus, Video, File, Calendar, Briefcase, Users, Edit, Star } from 'lucide-react';
import Login from './Login';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState('inquiries');

    // Data States
    const [inquiries, setInquiries] = useState([]);
    const [siteContent, setSiteContent] = useState({});
    const [galleryItems, setGalleryItems] = useState([]);
    const [events, setEvents] = useState([]);
    const [videos, setVideos] = useState([]);
    const [services, setServices] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [resources, setResources] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [successStories, setSuccessStories] = useState([]);

    // Load initial data
    useEffect(() => {
        // Check login session (simple implementation)
        const session = sessionStorage.getItem('adminSession');
        if (session) setIsAuthenticated(true);

        // Load Data
        setInquiries(JSON.parse(localStorage.getItem('inquiries') || '[]'));
        setSiteContent(JSON.parse(localStorage.getItem('siteContent') || '{}'));
        setGalleryItems(JSON.parse(localStorage.getItem('galleryItems') || '[]'));
        setEvents(JSON.parse(localStorage.getItem('events') || '[]'));
        setVideos(JSON.parse(localStorage.getItem('videos') || '[]'));
        setServices(JSON.parse(localStorage.getItem('services') || '[]'));
        setCertificates(JSON.parse(localStorage.getItem('certificates') || '[]'));
        setBlogs(JSON.parse(localStorage.getItem('blogs') || '[]'));
        setResources(JSON.parse(localStorage.getItem('resources') || '[]'));
        setTeamMembers(JSON.parse(localStorage.getItem('teamMembers') || '[]'));
        setSuccessStories(JSON.parse(localStorage.getItem('successStories') || '[]'));
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminSession', 'true');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('adminSession');
    }

    // --- Actions ---

    const exportInquiries = () => {
        if (inquiries.length === 0) return alert('No data to export');

        const headers = ['Date', 'Name', 'Email', 'Mobile'];
        const csvContent = [
            headers.join(','),
            ...inquiries.map(inq => `${inq.date}, "${inq.name}", "${inq.email}", "${inq.mobile}"`)
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `inquiries_export_${Date.now()}.csv`;
        link.click();
    };

    const saveContent = (e) => {
        e.preventDefault();
        localStorage.setItem('siteContent', JSON.stringify(siteContent));
        alert('Site Content updated!');
    };

    // Generic Delete Helper
    const deleteItem = (key, data, setData, id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        const updated = data.filter(item => item.id !== id);
        setData(updated);
        localStorage.setItem(key, JSON.stringify(updated));
    };

    // Add Item Helpers (Simplified for demo - normally would need detailed forms)
    const addItem = (key, data, setData, newItem) => {
        const updated = [...data, newItem];
        setData(updated);
        localStorage.setItem(key, JSON.stringify(updated));
    };

    const updateItem = (key, data, setData, id, updatedFields) => {
        const updated = data.map(item => item.id === id ? { ...item, ...updatedFields } : item);
        setData(updated);
        localStorage.setItem(key, JSON.stringify(updated));
    };


    if (!isAuthenticated) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="section-padding container">
            {/* Background Blob */}
            <div className="bg-blob" style={{ top: '5%', right: '-5%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(0,0,0,0) 70%)' }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src="/favicon.png" alt="Bechdenge Logo" style={{ height: '50px', width: 'auto' }} />
                    <h1 className="text-gradient" style={{ fontSize: '2.5rem' }}>Admin Dashboard</h1>
                </div>
                <button onClick={handleLogout} className="btn btn-secondary">Sign Out</button>
            </div>

            {/* Tabs Navigation */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '3rem',
                borderBottom: '1px solid var(--color-border)',
                overflowX: 'auto',
                paddingBottom: '0.25rem',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                {[
                    { id: 'inquiries', icon: <MessageSquare size={18} />, label: 'Inquiries' },
                    { id: 'content', icon: <Layout size={18} />, label: 'Site Content' },
                    { id: 'team', icon: <Users size={18} />, label: 'Team' },
                    { id: 'services', icon: <Briefcase size={18} />, label: 'Services' },
                    { id: 'gallery', icon: <Image size={18} />, label: 'Gallery' },
                    { id: 'events', icon: <Calendar size={18} />, label: 'Events' },
                    { id: 'videos', icon: <Video size={18} />, label: 'Videos' },
                    { id: 'testimonials', icon: <Star size={18} />, label: 'Testimonials' },
                    { id: 'certificates', icon: <Award size={18} />, label: 'Certificates' },
                    { id: 'blog', icon: <FileText size={18} />, label: 'Blog' },
                    { id: 'resources', icon: <File size={18} />, label: 'Resources' },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '1rem 1.25rem',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                            color: activeTab === tab.id ? 'white' : 'var(--color-text-secondary)',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.3s ease',
                            opacity: activeTab === tab.id ? 1 : 0.7
                        }}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* --- Inquiries Tab --- */}
            {activeTab === 'inquiries' && (
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'white' }}>Client Inquiries</h2>
                        <button onClick={exportInquiries} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
                            <Download size={16} /> Export CSV
                        </button>
                    </div>

                    {inquiries.length === 0 ? <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '3rem' }}>No inquiries received yet.</p> : (
                        <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255, 255, 255, 0.03)', textAlign: 'left' }}>
                                        <th style={{ padding: '1.25rem', color: 'white', fontSize: '0.9rem' }}>Date</th>
                                        <th style={{ padding: '1.25rem', color: 'white', fontSize: '0.9rem' }}>Name</th>
                                        <th style={{ padding: '1.25rem', color: 'white', fontSize: '0.9rem' }}>Email</th>
                                        <th style={{ padding: '1.25rem', color: 'white', fontSize: '0.9rem' }}>Mobile</th>
                                        <th style={{ padding: '1.25rem', color: 'white', fontSize: '0.9rem', textAlign: 'center' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inquiries.map((inq) => (
                                        <tr key={inq.id} style={{ borderTop: '1px solid var(--color-border)', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                            <td style={{ padding: '1.25rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{inq.date}</td>
                                            <td style={{ padding: '1.25rem', color: 'white', fontSize: '0.9rem', fontWeight: '600' }}>{inq.name}</td>
                                            <td style={{ padding: '1.25rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{inq.email}</td>
                                            <td style={{ padding: '1.25rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{inq.mobile}</td>
                                            <td style={{ padding: '1.25rem', textAlign: 'center' }}>
                                                <button
                                                    onClick={() => deleteItem('inquiries', inquiries, setInquiries, inq.id)}
                                                    style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex' }}
                                                    title="Delete"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* --- Site Content CMS Tab --- */}
            {activeTab === 'content' && (
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Manage Site Texts</h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Update titles, contact information and other static content across the site.</p>
                    </div>

                    <form onSubmit={saveContent}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
                            <div>
                                <label style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>Home Page Title</label>
                                <input type="text" value={siteContent.homeTitle || ''} onChange={(e) => setSiteContent({ ...siteContent, homeTitle: e.target.value })} style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)', borderRadius: '10px', color: 'white', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>Contact Email</label>
                                <input type="text" value={siteContent.contactEmail || ''} onChange={(e) => setSiteContent({ ...siteContent, contactEmail: e.target.value })} style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)', borderRadius: '10px', color: 'white', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>Contact Phone</label>
                                <input type="text" value={siteContent.contactPhone || ''} onChange={(e) => setSiteContent({ ...siteContent, contactPhone: e.target.value })} style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)', borderRadius: '10px', color: 'white', outline: 'none' }} />
                            </div>
                        </div>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <label style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>Home Subtitle / Hero Text</label>
                            <textarea value={siteContent.homeSubtitle || ''} onChange={(e) => setSiteContent({ ...siteContent, homeSubtitle: e.target.value })} rows={4} style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)', borderRadius: '10px', color: 'white', outline: 'none', resize: 'vertical' }} />
                        </div>

                        <button className="btn btn-primary" style={{ padding: '1rem 2rem' }}><Save size={18} /> Sync All Changes</button>
                    </form>
                </div>
            )}

            {/* --- Team Manager --- */}
            {activeTab === 'team' && (
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Manage Team</h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Add or edit team members displayed on the about page.</p>
                        </div>
                        <button className="btn btn-secondary" onClick={() => {
                            const name = prompt('Member Name');
                            const role = prompt('Designation / Role');
                            const image = prompt('Image URL (e.g. from LinkedIn or placeholder)');
                            const bio = prompt('Short Bio');
                            if (name && role) addItem('teamMembers', teamMembers, setTeamMembers, {
                                id: Date.now(),
                                name,
                                role,
                                image: image || 'https://via.placeholder.com/400x400',
                                bio: bio || ''
                            });
                        }}> <Plus size={16} /> Add Member</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                        {teamMembers.map(member => (
                            <div key={member.id} style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: 'var(--radius-lg)',
                                padding: '2rem',
                                border: '1px solid var(--color-border)',
                                textAlign: 'center',
                                position: 'relative',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ position: 'absolute', top: 15, right: 15, display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => {
                                            const name = prompt('Member Name', member.name);
                                            const role = prompt('Designation / Role', member.role);
                                            const image = prompt('Image URL', member.image);
                                            const bio = prompt('Short Bio', member.bio);
                                            if (name && role) updateItem('teamMembers', teamMembers, setTeamMembers, member.id, { name, role, image, bio: bio || '' });
                                        }}
                                        style={{ color: 'white', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer' }}
                                    ><Edit size={14} /></button>
                                    <button
                                        onClick={() => deleteItem('teamMembers', teamMembers, setTeamMembers, member.id)}
                                        style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer' }}
                                    ><Trash size={14} /></button>
                                </div>
                                <img src={member.image} alt={member.name} style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1.25rem', border: '2px solid var(--color-primary)', padding: '3px' }} />
                                <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '0.4rem' }}>{member.name}</h3>
                                <p style={{ color: 'var(--color-primary)', fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{member.role}</p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- Services Manager --- */}
            {activeTab === 'services' && (
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Manage Services</h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Define the core service offerings of Bechdenge.</p>
                        </div>
                        <button className="btn btn-secondary" onClick={() => {
                            const title = prompt('Service Title');
                            const description = prompt('Description');
                            if (title) addItem('services', services, setServices, {
                                id: Date.now(),
                                title,
                                description: description || '',
                                icon: 'Briefcase'
                            });
                        }}> <Plus size={16} /> Add Service</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {services.map(service => (
                            <div key={service.id} style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: 'var(--radius-md)',
                                padding: '1.75rem',
                                border: '1px solid var(--color-border)',
                                position: 'relative',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ position: 'absolute', top: 15, right: 15, display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => {
                                            const title = prompt('Service Title', service.title);
                                            const description = prompt('Description', service.description);
                                            if (title) updateItem('services', services, setServices, service.id, { title, description: description || '' });
                                        }}
                                        style={{ color: 'white', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer' }}
                                    ><Edit size={14} /></button>
                                    <button
                                        onClick={() => deleteItem('services', services, setServices, service.id)}
                                        style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer' }}
                                    ><Trash size={14} /></button>
                                </div>
                                <h3 style={{ fontSize: '1.15rem', color: 'white', marginBottom: '0.75rem', paddingRight: '3rem', fontWeight: '600' }}>{service.title}</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- Gallery Manager --- */}
            {activeTab === 'gallery' && (
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Manage Photos</h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Upload and organize the media gallery.</p>
                        </div>
                        <button className="btn btn-secondary" onClick={() => {
                            const url = prompt('Enter Image URL');
                            const caption = prompt('Enter Caption');
                            if (url && caption) addItem('galleryItems', galleryItems, setGalleryItems, { id: Date.now(), src: url, caption, type: 'New' });
                        }}> <Plus size={16} /> Add Photo</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        {galleryItems.map(item => (
                            <div key={item.id} style={{
                                position: 'relative',
                                border: '1px solid var(--color-border)',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                background: 'rgba(255, 255, 255, 0.02)'
                            }}>
                                <img src={item.src} alt={item.caption} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: '0.4rem' }}>
                                    <button
                                        onClick={() => {
                                            const url = prompt('Image URL', item.src);
                                            const caption = prompt('Caption', item.caption);
                                            if (url && caption) updateItem('galleryItems', galleryItems, setGalleryItems, item.id, { src: url, caption });
                                        }}
                                        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', color: 'white', border: 'none', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer' }}
                                    ><Edit size={12} /></button>
                                    <button
                                        onClick={() => deleteItem('galleryItems', galleryItems, setGalleryItems, item.id)}
                                        style={{ background: 'rgba(239, 68, 68, 0.8)', color: 'white', border: 'none', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer' }}
                                    ><Trash size={12} /></button>
                                </div>
                                <p style={{ fontSize: '0.8rem', padding: '0.75rem', color: 'var(--color-text-secondary)', textAlign: 'center' }}>{item.caption}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- Certificates Manager --- */}
            {activeTab === 'certificates' && (
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Manage Certificates</h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Update professional credentials and awards.</p>
                        </div>
                        <button className="btn btn-secondary" onClick={() => {
                            const title = prompt('Certificate Title');
                            const issuer = prompt('Issuer');
                            if (title && issuer) addItem('certificates', certificates, setCertificates, { id: Date.now(), title, issuer, image: 'https://via.placeholder.com/600x400?text=New+Cert' });
                        }}> <Plus size={16} /> Add Certificate</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {certificates.map(cert => (
                            <div key={cert.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1.25rem',
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '12px',
                                transition: 'all 0.2s ease'
                            }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '0.25rem', fontSize: '1rem' }}>{cert.title}</h4>
                                    <p style={{ color: 'var(--color-primary)', fontSize: '0.85rem' }}>{cert.issuer}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => {
                                        const title = prompt('Certificate Title', cert.title);
                                        const issuer = prompt('Issuer', cert.issuer);
                                        if (title && issuer) updateItem('certificates', certificates, setCertificates, cert.id, { title, issuer });
                                    }} style={{ color: 'white', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '6px', padding: '0.5rem', cursor: 'pointer' }}><Edit size={16} /></button>
                                    <button onClick={() => deleteItem('certificates', certificates, setCertificates, cert.id)} style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '6px', padding: '0.5rem', cursor: 'pointer' }}><Trash size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- Blog Manager --- */}
            {activeTab === 'blog' && (
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Manage Blog Posts</h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Publish insights and updates for your audience.</p>
                        </div>
                        <button className="btn btn-secondary" onClick={() => {
                            const title = prompt('Blog Title');
                            const excerpt = prompt('Short Excerpt');
                            if (title && excerpt) addItem('blogs', blogs, setBlogs, { id: Date.now(), title, excerpt, date: new Date().toISOString().split('T')[0], content: 'Content...' });
                        }}> <Plus size={16} /> Add Post</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {blogs.map(blog => (
                            <div key={blog.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '1.5rem',
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '12px'
                            }}>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '0.4rem', fontSize: '1.1rem' }}>{blog.title}</h4>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{blog.date}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>Published</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <button onClick={() => {
                                        const title = prompt('Blog Title', blog.title);
                                        const excerpt = prompt('Short Excerpt', blog.excerpt);
                                        if (title && excerpt) updateItem('blogs', blogs, setBlogs, blog.id, { title, excerpt });
                                    }} style={{ color: 'white', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '6px', padding: '0.6rem', cursor: 'pointer' }}><Edit size={16} /></button>
                                    <button onClick={() => deleteItem('blogs', blogs, setBlogs, blog.id)} style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '6px', padding: '0.6rem', cursor: 'pointer' }}><Trash size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}



            {/* --- Events Manager --- */}
            {activeTab === 'events' && (
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Manage Events</h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Schedule and manage upcoming webinars and workshops.</p>
                        </div>
                        <button className="btn btn-secondary" onClick={() => {
                            const title = prompt('Event Title');
                            const date = prompt('Date (e.g. Oct 25, 2026)');
                            const time = prompt('Time (e.g. 4:00 PM IST)');
                            const location = prompt('Location (e.g. Zoom)');
                            const description = prompt('Description');
                            if (title && date) addItem('events', events, setEvents, {
                                id: Date.now(),
                                title,
                                date,
                                time: time || 'TBA',
                                location: location || 'Online',
                                description: description || '',
                                status: 'Upcoming'
                            });
                        }}> <Plus size={16} /> Add Event</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                        {events.map(event => (
                            <div key={event.id} style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: 'var(--radius-md)',
                                overflow: 'hidden',
                                border: '1px solid var(--color-border)',
                                transition: 'transform 0.3s ease'
                            }}>
                                <div style={{ padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{event.date}</span>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => {
                                                const title = prompt('Event Title', event.title);
                                                const date = prompt('Date', event.date);
                                                const time = prompt('Time', event.time);
                                                const location = prompt('Location', event.location);
                                                const description = prompt('Description', event.description);
                                                if (title && date) updateItem('events', events, setEvents, event.id, { title, date, time: time || 'TBA', location: location || 'Online', description: description || '' });
                                            }}
                                            style={{ color: 'white', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', padding: '0.35rem', cursor: 'pointer' }}
                                        ><Edit size={14} /></button>
                                        <button
                                            onClick={() => deleteItem('events', events, setEvents, event.id)}
                                            style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '4px', padding: '0.35rem', cursor: 'pointer' }}
                                        ><Trash size={14} /></button>
                                    </div>
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '1rem' }}>{event.title}</h3>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <Calendar size={14} /> {event.time}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <Video size={14} /> {event.location}
                                        </div>
                                    </div>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>{event.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- Videos Manager --- */}
            {activeTab === 'videos' && (
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Manage Videos</h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Embed YouTube/Vimeo videos for the media page.</p>
                        </div>
                        <button className="btn btn-secondary" onClick={() => {
                            const title = prompt('Video Title');
                            const embedUrl = prompt('Embed URL (e.g. https://www.youtube.com/embed/...)');
                            const description = prompt('Short Description');
                            if (title && embedUrl) addItem('videos', videos, setVideos, { id: Date.now(), title, embedUrl, description: description || '' });
                        }}> <Plus size={16} /> Add Video</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                        {videos.map(video => (
                            <div key={video.id} style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: 'var(--radius-md)',
                                overflow: 'hidden',
                                border: '1px solid var(--color-border)'
                            }}>
                                <div style={{ padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong style={{ color: 'white', fontSize: '0.95rem' }}>{video.title}</strong>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => {
                                                const title = prompt('Video Title', video.title);
                                                const embedUrl = prompt('Embed URL', video.embedUrl);
                                                const description = prompt('Short Description', video.description);
                                                if (title && embedUrl) updateItem('videos', videos, setVideos, video.id, { title, embedUrl, description: description || '' });
                                            }}
                                            style={{ color: 'white', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', padding: '0.35rem', cursor: 'pointer' }}
                                        ><Edit size={14} /></button>
                                        <button
                                            onClick={() => deleteItem('videos', videos, setVideos, video.id)}
                                            style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '4px', padding: '0.35rem', cursor: 'pointer' }}
                                        ><Trash size={14} /></button>
                                    </div>
                                </div>
                                <div style={{ padding: '1.25rem' }}>
                                    <div style={{ background: '#000', height: '160px', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                                        {/* Thumbnail or Icon Placeholder */}
                                        <Video size={40} opacity={0.3} />
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>{video.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- Testimonials Manager --- */}
            {activeTab === 'testimonials' && (
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Manage Success Stories</h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Feature client feedback and social proof.</p>
                        </div>
                        <button className="btn btn-secondary" onClick={() => {
                            const name = prompt('Client Name');
                            const role = prompt('Role / Company');
                            const quote = prompt('Testimonial Quote');
                            const rating = prompt('Rating (1-5)', '5');
                            if (name && quote) addItem('successStories', successStories, setSuccessStories, {
                                id: Date.now(),
                                name,
                                role: role || '',
                                quote,
                                rating: parseInt(rating) || 5
                            });
                        }}> <Plus size={16} /> Add Story</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {successStories.map(story => (
                            <div key={story.id} style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: 'var(--radius-lg)',
                                padding: '2rem',
                                border: '1px solid var(--color-border)',
                                position: 'relative'
                            }}>
                                <div style={{ position: 'absolute', top: 15, right: 15, display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => {
                                            const name = prompt('Client Name', story.name);
                                            const role = prompt('Role / Company', story.role);
                                            const quote = prompt('Testimonial Quote', story.quote);
                                            const rating = prompt('Rating (1-5)', story.rating);
                                            if (name && quote) updateItem('successStories', successStories, setSuccessStories, story.id, {
                                                name,
                                                role: role || '',
                                                quote,
                                                rating: parseInt(rating) || 5
                                            });
                                        }}
                                        style={{ color: 'white', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', padding: '0.4rem', cursor: 'pointer' }}
                                    ><Edit size={14} /></button>
                                    <button
                                        onClick={() => deleteItem('successStories', successStories, setSuccessStories, story.id)}
                                        style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '4px', padding: '0.4rem', cursor: 'pointer' }}
                                    ><Trash size={14} /></button>
                                </div>

                                <div style={{ color: '#fbbf24', marginBottom: '0.75rem', fontSize: '1rem' }}>{'★'.repeat(story.rating)}</div>
                                <p style={{ color: 'white', fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: '1.6' }}>"{story.quote}"</p>
                                <h4 style={{ fontSize: '1rem', color: 'white', fontWeight: 'bold' }}>{story.name}</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{story.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- Resources Manager --- */}
            {activeTab === 'resources' && (
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Manage Resources</h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Manage downloadable PDFs, Excel sheets, and tools.</p>
                        </div>
                        <button className="btn btn-secondary" onClick={() => {
                            const title = prompt('Resource Title');
                            const link = prompt('Download Link (Google Drive / Dropbox / URL)');
                            const type = prompt('File Type (PDF, Excel, Zip)');
                            const description = prompt('Description');
                            if (title && link) addItem('resources', resources, setResources, { id: Date.now(), title, link, type: type || 'File', description: description || '' });
                        }}> <Plus size={16} /> Add Resource</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {resources.map(res => (
                            <div key={res.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1.5rem',
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '12px'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                        <h4 style={{ color: 'white', fontSize: '1.1rem' }}>{res.title}</h4>
                                        <span style={{ fontSize: '0.7rem', background: 'var(--color-primary)', color: 'white', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>{res.type}</span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>{res.description}</p>
                                    <a href={res.link} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '600' }}>View Source Link</a>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => {
                                        const title = prompt('Resource Title', res.title);
                                        const link = prompt('Download Link', res.link);
                                        const type = prompt('File Type', res.type);
                                        const description = prompt('Description', res.description);
                                        if (title && link) updateItem('resources', resources, setResources, res.id, { title, link, type: type || 'File', description: description || '' });
                                    }} style={{ color: 'white', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '6px', padding: '0.6rem', cursor: 'pointer' }}><Edit size={16} /></button>
                                    <button onClick={() => deleteItem('resources', resources, setResources, res.id)} style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '6px', padding: '0.6rem', cursor: 'pointer' }}><Trash size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default Admin;
