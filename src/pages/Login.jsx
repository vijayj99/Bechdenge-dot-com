import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Hardcoded credentials for demo purpose
        if (username === 'admin' && password === 'admin123') {
            onLogin();
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="section-padding container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <form onSubmit={handleLogin} className="glass-card" style={{
                padding: '3rem',
                width: '100%',
                maxWidth: '400px',
            }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <img src="/favicon.png" alt="Bechdenge Logo" style={{ height: '60px', width: 'auto' }} />
                </div>
                <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Admin Access</h2>
                {error && <p style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', background: 'rgba(239,68,68,0.1)', padding: '0.5rem', borderRadius: '4px' }}>{error}</p>}

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px',
                            color: 'white',
                            outline: 'none'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px',
                            color: 'white',
                            outline: 'none'
                        }}
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Login Secured</button>
            </form>
        </div>
    );
};

export default Login;
