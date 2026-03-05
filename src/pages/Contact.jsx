import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Seo from '../components/Seo';

const Contact = () => {
    return (
        <div className="section-padding container" style={{ position: 'relative' }}>
            <Seo title="Contact Us" description="Get in touch with Bechdenge for your Amazon and Ecommerce needs." />

            {/* Background Blobs */}
            <div className="bg-blob" style={{ top: '10%', right: '5%', opacity: 0.5 }}></div>
            <div className="bg-blob" style={{ bottom: '10%', left: '5%', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(0,0,0,0) 70%)', opacity: 0.5 }}></div>

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Contact Us</h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        Ready to scale your e-commerce brand? Get in touch with us today.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    {/* Contact Info */}
                    <div className="glass-card" style={{ padding: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'white' }}>Get in Touch</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ width: '48px', height: '48px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Phone color="var(--color-primary)" size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'white' }}>Phone</h3>
                                    <p style={{ color: 'var(--color-text-secondary)' }}>+91 92651 41412</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ width: '48px', height: '48px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Mail color="var(--color-secondary)" size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'white' }}>Email</h3>
                                    <p style={{ color: 'var(--color-text-secondary)' }}>contact@bechdenge.com</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ width: '48px', height: '48px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <MapPin color="#10b981" size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'white' }}>Location</h3>
                                    <p style={{ color: 'var(--color-text-secondary)' }}>India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass-card" style={{ padding: '3rem' }}>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>First Name</label>
                                    <input type="text" placeholder="John" style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'white', outline: 'none' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Last Name</label>
                                    <input type="text" placeholder="Doe" style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'white', outline: 'none' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Email Address</label>
                                <input type="email" placeholder="john@example.com" style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'white', outline: 'none' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Message</label>
                                <textarea rows="4" placeholder="How can we help you?" style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'white', outline: 'none', resize: 'vertical' }}></textarea>
                            </div>

                            <button type="button" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                                Send Message <Send size={18} style={{ marginLeft: '0.5rem' }} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
