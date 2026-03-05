import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

const OAuthRedirect = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('Authorizing...');

    useEffect(() => {
        // This is a placeholder for the actual Amazon Seller OAuth flow.
        // It simulates processing the authorization code.
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (code) {
            setStatus('Processing Amazon Seller Authorization...');
            // Here you would typically send the code to your backend to exchange for tokens
            setTimeout(() => {
                setStatus('Authorization Successful! Redirecting...');
                setTimeout(() => {
                    navigate('/'); // Or redirect to a dashboard/admin panel
                }, 2000);
            }, 2000);
        } else {
            const error = searchParams.get('error');
            if (error) {
                setStatus(`Authorization Failed: ${error}`);
            } else {
                setStatus('Invalid Request. Missing authorization code.');
            }
        }
    }, [searchParams, navigate]);

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', maxWidth: '500px', width: '90%' }}>
                <Loader className="spin" size={48} color="var(--color-primary)" style={{ margin: '0 auto 2rem auto', display: 'block' }} />
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Amazon Integration</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>{status}</p>
            </div>
        </div>
    );
};

export default OAuthRedirect;
