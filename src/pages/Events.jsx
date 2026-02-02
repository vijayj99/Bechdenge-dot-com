import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const Events = () => {
    const [events, setEvents] = React.useState([]);
    const [registeringEvent, setRegisteringEvent] = React.useState(null);
    const [formData, setFormData] = React.useState({ name: '', mobile: '' });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    React.useEffect(() => {
        const savedEvents = JSON.parse(localStorage.getItem('events'));
        if (savedEvents) {
            setEvents(savedEvents);
        } else {
            const defaults = [
                {
                    id: 1,
                    title: 'Advanced Amazon PPC Mastery Webinar',
                    date: 'Oct 25, 2026',
                    time: '4:00 PM - 6:00 PM IST',
                    location: 'Online (Zoom)',
                    description: 'Learn the secrets of lowering ACOS and scaling your Amazon sales with proven strategies.',
                    status: 'Upcoming'
                },
                {
                    id: 2,
                    title: 'Google Ads for Ecommerce Success',
                    date: 'Nov 12, 2026',
                    time: '2:00 PM - 5:00 PM IST',
                    location: 'Online (Live Stream)',
                    description: 'A comprehensive workshop on setting up and optimizing Google Shopping ads.',
                    status: 'Upcoming'
                }
            ];
            setEvents(defaults);
            localStorage.setItem('events', JSON.stringify(defaults));
        }
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const botToken = "8591947920:AAFwodG6NdzTlgrD4XK9lIwDkRTwA285i4g";
        const chatId = "594320196";
        const message = `🎟️ *New Webinar Registration*\n\n` +
            `📅 *Event:* ${registeringEvent.title}\n` +
            `👤 *Name:* ${formData.name}\n` +
            `📱 *Phone:* ${formData.mobile}\n\n` +
            `_User is waiting for the webinar link._`;

        try {
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });
            setIsSuccess(true);
            setTimeout(() => {
                setRegisteringEvent(null);
                setIsSuccess(false);
                setFormData({ name: '', mobile: '' });
            }, 3000);
        } catch (error) {
            alert("Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="section-padding container">
            {/* Background Blob */}
            <div className="bg-blob" style={{ bottom: '20%', left: '-5%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(0,0,0,0) 70%)' }}></div>

            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Upcoming <span className="text-gradient">Events</span></h1>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    Join our live sessions, webinars, and workshops to level up your digital marketing skills.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                {events.map((event) => (
                    <div key={event.id} className="glass-card" style={{
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative'
                    }}>
                        <div style={{
                            background: 'var(--gradient-main)',
                            padding: '0.5rem 1rem',
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            color: 'white',
                            boxShadow: '0 2px 10px rgba(99, 102, 241, 0.4)'
                        }}>
                            {event.status || 'Upcoming'}
                        </div>

                        <div style={{ padding: '2rem' }}>
                            <h2 style={{ marginBottom: '1rem' }}>{event.title}</h2>
                            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>{event.description}</p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={18} color="var(--color-primary)" />
                                    <span>{event.date}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Clock size={18} color="var(--color-primary)" />
                                    <span>{event.time}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MapPin size={18} color="var(--color-primary)" />
                                    <span>{event.location}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setRegisteringEvent(event)}
                                className="btn btn-primary"
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                Register Now for Free
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Registration Modal Overlay */}
            {registeringEvent && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <div className="glass-card" style={{ maxWidth: '450px', width: '100%', padding: '2.5rem', position: 'relative' }}>
                        {!isSuccess ? (
                            <>
                                <button
                                    onClick={() => setRegisteringEvent(null)}
                                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}
                                >
                                    &times;
                                </button>
                                <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Reserve Your Spot</h2>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>{registeringEvent.title}</p>

                                <form onSubmit={handleRegister}>
                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Your Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', color: 'white', outline: 'none' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '2rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>WhatsApp Number</label>
                                        <input
                                            required
                                            type="tel"
                                            pattern="[0-9]*"
                                            value={formData.mobile}
                                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                                            placeholder="Only numbers allowed"
                                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', color: 'white', outline: 'none' }}
                                        />
                                    </div>
                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{ width: '100%', justifyContent: 'center' }}
                                    >
                                        {isSubmitting ? "Registering..." : "Confirm Registration"}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                                <h2 style={{ marginBottom: '1rem' }}>Success!</h2>
                                <p style={{ color: 'var(--color-text-secondary)' }}>Aapki registration details Vijay tak pahunch gayi hain. Webinar link jald hi WhatsApp par share kiya jayega.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;
