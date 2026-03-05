import React from 'react';
import Seo from '../components/Seo';

const TermsOfService = () => {
    return (
        <div className="section-padding container" style={{ position: 'relative' }}>
            <Seo title="Terms of Service" description="Terms of Service for Bechdenge.com" />

            {/* Background Blobs */}
            <div className="bg-blob" style={{ top: '10%', right: '5%', opacity: 0.5 }}></div>
            <div className="bg-blob" style={{ bottom: '10%', left: '5%', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(0,0,0,0) 70%)', opacity: 0.5 }}></div>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Terms of Service</h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>

                <div className="glass-card" style={{ padding: '3.5rem', lineHeight: '1.8' }}>
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ color: 'var(--color-primary)' }}>01.</span> Agreement to Terms
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            By accessing or using Bechdenge.com, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ color: 'var(--color-primary)' }}>02.</span> Use License
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                            Permission is granted to temporarily download one copy of the materials (information or software) on Bechdenge's website for personal, non-commercial transitory viewing only.
                        </p>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                            <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', borderLeft: '2px solid var(--color-primary)', color: 'var(--color-text-secondary)' }}>
                                Modify or copy the materials;
                            </li>
                            <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', borderLeft: '2px solid var(--color-primary)', color: 'var(--color-text-secondary)' }}>
                                Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
                            </li>
                            <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', borderLeft: '2px solid var(--color-primary)', color: 'var(--color-text-secondary)' }}>
                                Attempt to decompile or reverse engineer any software contained on the website;
                            </li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ color: 'var(--color-primary)' }}>03.</span> Disclaimer
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                            The materials on Bechdenge.com are provided on an 'as is' basis. Bechdenge makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section style={{ padding: '2rem', background: 'var(--gradient-main)', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>Questions & Contact</h2>
                        <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                            If you have any questions about these Terms, please contact us.
                        </p>
                        <a href="/contact" className="btn btn-secondary" style={{ background: 'white', color: 'var(--color-primary)', border: 'none' }}>Contact Us</a>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
