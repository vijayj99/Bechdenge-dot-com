import React, { useEffect, useState } from 'react';
// Data initialization handled internally to avoid circular dependencies
// For now, I'll handle data initialization inside the component to be safe.

const Blog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const savedBlogs = JSON.parse(localStorage.getItem('blogs'));
        if (savedBlogs) {
            setBlogs(savedBlogs);
        } else {
            // Default dummy data if nothing in storage
            const defaults = [
                { id: 1, title: 'Top 5 Amazon PPC Strategies', date: '2026-01-15', excerpt: 'Learn how to lower your ACOS and boost sales.', content: 'Full content here...' },
                { id: 2, title: 'Google Ads or Facebook Ads?', date: '2026-01-10', excerpt: 'Which platform is right for your ecommerce business?', content: 'Full content here...' }
            ];
            setBlogs(defaults);
            localStorage.setItem('blogs', JSON.stringify(defaults));
        }
    }, []);

    return (
        <div className="section-padding container">
            <div className="bg-blob" style={{ top: '20%', right: '-10%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(0,0,0,0) 70%)' }}></div>

            <h1 style={{ textAlign: 'center', marginBottom: '3.5rem', fontSize: '3rem' }}>Latest <span className="text-gradient">Insights</span></h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {blogs.map(blog => (
                    <article key={blog.id} className="glass-card" style={{
                        overflow: 'hidden',
                        transition: 'transform 0.3s ease'
                    }}>
                        <div style={{ padding: '2rem' }}>
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: '500' }}>{blog.date}</span>
                            <h2 style={{ fontSize: '1.5rem', margin: '0.75rem 0 1.25rem', color: 'white', fontWeight: '700' }}>{blog.title}</h2>
                            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', lineHeight: '1.7' }}>{blog.excerpt}</p>
                            <button className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}>Read Full Post</button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Blog;
