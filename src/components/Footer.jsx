import React from 'react';
import { Mail, Phone, User, Linkedin, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [contactInfo, setContactInfo] = React.useState({
        email: 'contact@bechdenge.com',
        phone: '+91 92651 41412',
        phoneLink: '+919265141412'
    });

    React.useEffect(() => {
        const savedContent = JSON.parse(localStorage.getItem('siteContent') || '{}');
        if (savedContent.contactEmail || savedContent.contactPhone) {
            setContactInfo({
                email: savedContent.contactEmail || 'contact@bechdenge.com',
                phone: savedContent.contactPhone || '+91 92651 41412',
                phoneLink: (savedContent.contactPhone || '+919265141412').replace(/\D/g, '') // slightly naive cleanup for link
            });
        }
    }, []);

    return (
        <footer style={{
            background: 'var(--color-bg-secondary)',
            borderTop: '1px solid var(--color-border)',
            color: 'white',
            padding: '4rem 0 0 0',
            marginTop: 'auto',
            position: 'relative',
            zIndex: 10,
            overflow: 'hidden'
        }}>
            {/* Subtle Gradient Glow */}
            <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '200px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(0,0,0,0) 70%)', zIndex: -1 }}></div>

            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', paddingBottom: '4rem' }}>

                {/* Brand / About */}
                <div>
                    <h2 className="text-gradient" style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: '800' }}>Bechdenge</h2>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        Helping Amazon sellers and e-commerce brands scale to new heights through data-driven PPC and account management.
                    </p>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: '600' }}>Get in Touch</h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <User size={18} color="var(--color-primary)" />
                            <span style={{ color: 'var(--color-text-secondary)' }}>Vijay Savani</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Mail size={18} color="var(--color-primary)" />
                            <a href={`mailto:${contactInfo.email}`} style={{ textDecoration: 'none', color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>{contactInfo.email}</a>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Phone size={18} color="var(--color-primary)" />
                            <a href={`tel:${contactInfo.phoneLink}`} style={{ textDecoration: 'none', color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>{contactInfo.phone}</a>
                        </li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h3 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: '600' }}>Follow Us</h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {[
                            { icon: <Linkedin size={20} />, url: "https://www.linkedin.com/in/vijay-savani-7b94111b5/" },
                            { icon: <MessageCircle size={20} />, url: "https://wa.me/+919265141412" },
                            { icon: <Instagram size={20} />, url: "https://www.instagram.com/vijaysavani_champion/" },
                            { icon: <Facebook size={20} />, url: "https://www.facebook.com/drvijay.patel99/" }
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid var(--color-border)',
                                    color: 'white',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--gradient-main)';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: '600' }}>Navigation</h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {[
                            { label: 'Services', to: '/services' },
                            { label: 'Media Gallery', to: '/gallery' },
                            { label: 'Certifications', to: '/certificates' },
                            { label: 'Book Call', to: '/booking' },
                            { label: 'Contact Us', to: '/contact' },
                            { label: 'Privacy Policy', to: '/privacy-policy' },
                            { label: 'Terms of Service', to: '/terms' }
                        ].map((link, idx) => (
                            <li key={idx}>
                                <Link to={link.to} style={{ textDecoration: 'none', color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div style={{ borderTop: '1px solid var(--color-border)', textAlign: 'center', padding: '2rem 1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                <p>&copy; {new Date().getFullYear()} Bechdenge. Proudly scaling brands.</p>
            </div>
        </footer>
    );
};

export default Footer;
