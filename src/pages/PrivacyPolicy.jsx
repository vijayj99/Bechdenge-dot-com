import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="section-padding container" style={{ position: 'relative' }}>
            {/* Background Blobs */}
            <div className="bg-blob" style={{ top: '10%', right: '5%', opacity: 0.5 }}></div>
            <div className="bg-blob" style={{ bottom: '10%', left: '5%', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(0,0,0,0) 70%)', opacity: 0.5 }}></div>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Privacy Policy</h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>

                <div className="glass-card" style={{ padding: '3.5rem', lineHeight: '1.8' }}>
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ color: 'var(--color-primary)' }}>01.</span> Introduction
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Welcome to <strong>Bechdenge.com</strong>. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ color: 'var(--color-primary)' }}>02.</span> Information We Collect
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', borderLeft: '2px solid var(--color-primary)' }}>
                                <strong style={{ color: 'white', display: 'block' }}>Identity Data</strong>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Includes first name, last name, username or similar identifier.</span>
                            </li>
                            <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', borderLeft: '2px solid var(--color-primary)' }}>
                                <strong style={{ color: 'white', display: 'block' }}>Contact Data</strong>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Includes email address and telephone numbers.</span>
                            </li>
                            <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', borderLeft: '2px solid var(--color-primary)' }}>
                                <strong style={{ color: 'white', display: 'block' }}>Technical Data</strong>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Includes IP address, login data, browser type/version, time zone setting, and operating system.</span>
                            </li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ color: 'var(--color-primary)' }}>03.</span> How We Use Your Data
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                                <p style={{ fontSize: '0.9rem', color: 'white' }}>To provide the services you request, such as consultations or downloads.</p>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                                <p style={{ fontSize: '0.9rem', color: 'white' }}>To improve our website, products/services, and customer relationships.</p>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                                <p style={{ fontSize: '0.9rem', color: 'white' }}>To contact you regarding your inquiries or account status.</p>
                            </div>
                        </div>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ color: 'var(--color-primary)' }}>04.</span> Data Security
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees and partners who have a business need to know.
                        </p>
                    </section>

                    <section style={{ padding: '2rem', background: 'var(--gradient-main)', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>Questions & Contact</h2>
                        <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                            If you have any questions about this privacy policy or our privacy practices, please reach out to our team.
                        </p>
                        <a href="/booking" className="btn btn-secondary" style={{ background: 'white', color: 'var(--color-primary)', border: 'none' }}>Contact Support</a>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
