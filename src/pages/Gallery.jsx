import React, { useState, useEffect } from 'react';

const Gallery = () => {
    const [items, setItems] = useState([]);
    const [videos, setVideos] = useState([]);
    const [activeTab, setActiveTab] = useState('photos');

    useEffect(() => {
        // Load Photos
        const savedItems = JSON.parse(localStorage.getItem('galleryItems'));
        if (savedItems) {
            setItems(savedItems);
        } else {
            const defaults = [
                { id: 1, type: 'Event', src: 'https://via.placeholder.com/600x400?text=Event+Highlight+1', caption: 'Amazon Sellers Summit 2025' },
                { id: 2, type: 'Press', src: 'https://via.placeholder.com/600x400?text=Newspaper+Cutting', caption: 'Featured in Times of India' },
                { id: 3, type: 'Event', src: 'https://via.placeholder.com/600x400?text=Workshop', caption: 'Live Workshop in Mumbai' },
                { id: 4, type: 'Award', src: 'https://via.placeholder.com/600x400?text=Award+Ceremony', caption: 'Best Digital Marketer Award' },
            ];
            setItems(defaults);
            localStorage.setItem('galleryItems', JSON.stringify(defaults));
        }

        // Load Videos
        const savedVideos = JSON.parse(localStorage.getItem('videos'));
        if (savedVideos) {
            setVideos(savedVideos);
        } else {
            const videoDefaults = [
                { id: 1, title: 'How to Optimize Amazon PPC', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Master the basics of PPC.' },
                { id: 2, title: 'Advanced keyword research', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Find winning keywords.' }
            ];
            setVideos(videoDefaults);
            localStorage.setItem('videos', JSON.stringify(videoDefaults));
        }
    }, []);

    return (
        <div className="section-padding container">
            <div className="bg-blob" style={{ top: '10%', right: '-10%', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, rgba(0,0,0,0) 70%)' }}></div>

            <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '3rem' }}>Media <span className="text-gradient">Gallery</span></h1>
            <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem auto', color: 'var(--color-text-secondary)' }}>
                Highlights from our events, media features, and educational videos.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
                <button
                    onClick={() => setActiveTab('photos')}
                    className={activeTab === 'photos' ? 'btn btn-primary' : 'btn btn-secondary'}
                >
                    Photos
                </button>
                <button
                    onClick={() => setActiveTab('videos')}
                    className={activeTab === 'videos' ? 'btn btn-primary' : 'btn btn-secondary'}
                >
                    Videos
                </button>
            </div>

            {activeTab === 'photos' && (
                <div style={{
                    columns: '3 300px',
                    gap: '1.5rem'
                }}>
                    {items.map(item => (
                        <div key={item.id} style={{ marginBottom: '1.5rem', breakInside: 'avoid' }}>
                            <div className="glass-card" style={{
                                overflow: 'hidden',
                                border: '1px solid var(--color-border)',
                                padding: '0'
                            }}>
                                <img src={item.src} alt={item.caption} style={{ width: '100%', display: 'block', borderBottom: '1px solid var(--color-border)' }} />
                                <div style={{ padding: '1.25rem' }}>
                                    <span style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        fontSize: '0.75rem',
                                        padding: '0.3rem 0.8rem',
                                        borderRadius: '50px',
                                        color: 'var(--color-primary)',
                                        fontWeight: '600',
                                        marginBottom: '0.75rem',
                                        display: 'inline-block',
                                        border: '1px solid var(--color-border)'
                                    }}>{item.type}</span>
                                    <p style={{ fontWeight: '500', color: 'white' }}>{item.caption}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'videos' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {videos.map(video => (
                        <div key={video.id} className="glass-card" style={{
                            overflow: 'hidden',
                            padding: '0'
                        }}>
                            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderBottom: '1px solid var(--color-border)' }}>
                                <iframe
                                    src={video.embedUrl}
                                    title={video.title}
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white' }}>{video.title}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{video.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gallery;
