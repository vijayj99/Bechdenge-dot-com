import React, { useState, useEffect } from 'react';
import { Mail, Phone, User, Send, CheckCircle } from 'lucide-react';

const Booking = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Save to local storage for Admin Panel
        const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
        const newInquiry = {
            id: Date.now(),
            ...formData,
            date: new Date().toLocaleDateString()
        };
        inquiries.push(newInquiry);
        localStorage.setItem('inquiries', JSON.stringify(inquiries));

        // 2. Prepare Telegram Message
        const botToken = "8591947920:AAFwodG6NdzTlgrD4XK9lIwDkRTwA285i4g";
        const chatId = "594320196"; // Correct Chat ID for @vijaysavani
        const message = `🚀 *New Lead from Bechdenge.com*\n\n` +
            `👤 *Name:* ${formData.name}\n` +
            `📧 *Email:* ${formData.email}\n` +
            `📱 *Phone:* ${formData.mobile}\n\n` +
            `_Action Required: Follow up for discovery call._`;

        try {
            // 3. Send to Telegram via Fetch API (Automatic)
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });
            console.log("Lead sent to Telegram successfully");
        } catch (error) {
            console.error("Error sending lead to Telegram:", error);
        }

        setSubmitted(true);
        setFormData({ name: '', email: '', mobile: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="section-padding container">
            <div className="bg-blob" style={{ top: '30%', left: '-10%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(0,0,0,0) 70%)' }}></div>

            <div style={{ maxWidth: '650px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }} className="text-gradient">Book a Strategy Call</h1>
                <p style={{ textAlign: 'center', marginBottom: '4rem', color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
                    Take the first step towards scaling your e-commerce brand. Let's discuss your goals.
                </p>

                {submitted ? (
                    <div className="glass-card" style={{
                        padding: '4rem 2rem',
                        textAlign: 'center',
                        borderColor: '#10b981'
                    }}>
                        <div style={{ width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                            <CheckCircle size={48} color="#10b981" />
                        </div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>Inquiry Received!</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem' }}>Vijay will review your details and reach out within 24 hours.</p>
                        <button onClick={() => setSubmitted(false)} className="btn btn-secondary">Send Another Inquiry</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '3.5rem' }}>
                        <div style={{ marginBottom: '1.75rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>FullName</label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '10px',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid var(--color-border)',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.75rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Professional Email</label>
                            <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@company.com"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '10px',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid var(--color-border)',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>WhatsApp / Phone Number</label>
                            <input
                                required
                                type="tel"
                                name="mobile"
                                pattern="[0-9]*"
                                value={formData.mobile}
                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                                placeholder="e.g. 9265141412 (Numbers only)"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '10px',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid var(--color-border)',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.1rem' }}>
                            Schedule My Call <Send size={18} />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Booking;
