import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Namaste 🙏, main Vijay Savani bol raha hoon. Aapka swagat hai. Bataiye, main kaise madad kar sakta hoon?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getVijayResponse = (input) => {
        const text = input.toLowerCase();

        // 1. GREETINGS
        if (text.includes("hi") || text.includes("hello") || text.includes("namaste") || text.includes("hey")) {
            return "Namaste! Main Vijay Savani hoon. Kaise hain aap? Main aapki e-commerce journey ko simplify karne mein kaise madad kar sakta hoon?";
        }

        // 2. PROBLEM/ISSUE
        if (text.includes("problem") || text.includes("issue") || text.includes("down") || text.includes("loss") || text.includes("phire se")) {
            return "I understand. Dekhiye, e-commerce mein 'Problem samajhna solution se zyada zaroori hota hai'. Aap mujhe thoda vistaar (detail) mein bataiye ki exact dikkat kahan aa rahi hai? Ads mein, inventory mein, ya conversion mein?";
        }

        // 3. MONEY/INVESTMENT
        if (text.includes("cost") || text.includes("expensive") || text.includes("paisa") || text.includes("money") || text.includes("budget") || text.includes("fees")) {
            const moneyResponses = [
                "Mera humesha ek hi rule raha hai: 'Paisa bachana bhi earning hi hoti hai'. Hum aapke budget ko waste nahi karenge, balki optimize karenge.",
                "Fees aur ad spend se zyada zaroori hai ROI. Agar system strong hoga to investment apne aap fruitful lagegi. Kya hum is par call pe baat karein?",
                "Main over-selling mein belief nahi rakhta. Pehle audit karte hain, agar value lage tabhi aage badhenge. Long-term socho, short-term nahi."
            ];
            return moneyResponses[Math.floor(Math.random() * moneyResponses.length)];
        }

        // 4. GROWTH/SCALE
        if (text.includes("growth") || text.includes("scaling") || text.includes("expand") || text.includes("sales") || text.includes("bhadhana")) {
            return "Scaling ke liye sirf ads kaafi nahi hote. 'System strong hoga to business apne aap grow karega'. Hum aapke brand ki foundation par kaam karenge. Kya aap ek sustainable growth model ke liye ready hain?";
        }

        // 5. SERVICES/WHAT DO YOU DO?
        if (text.includes("service") || text.includes("kaam") || text.includes("help") || text.includes("kya karte ho")) {
            return "Bechdenge mein hum Amazon PPC, Google Ads, Meta Ads aur complete E-commerce management dekhte hain. Lekin main pehle aapka business model samajhna chahunga. Ek discovery call schedule karein?";
        }

        // 6. BOOKING/CALL
        if (text.includes("book") || text.includes("call") || text.includes("meeting") || text.includes("appointment") || text.includes("talk") || text.includes("milna")) {
            return "Zaroor! Main bhi aapse baat karke aapke business ko aur gehrayi se samajhna chahunga. Aap yahan se slot book kar sakte hain: [Schedule Call](/booking)";
        }

        // 7. WHO ARE YOU?
        if (text.includes("who are you") || text.includes("aap kaun") || text.includes("vijay")) {
            return "Main Vijay Savani, ek e-commerce specialist aur Bechdenge ka founder. Mera mission hai brands ko logically scale karne mein madad karna. Bina kisi fake promises ke.";
        }

        // 8. DATA/TRUST/HONESTY
        if (text.includes("trust") || text.includes("guarantee") || text.includes("result") || text.includes("paka")) {
            return "Main fake promises nahi karta. Digital marketing mein data hi sach bolta hai. Hum transparency aur clarity ke saath kaam karte hain. Trust build karne ke liye pehle ek baar baat karte hain?";
        }

        // FALLBACKS (To avoid repetition)
        const fallbacks = [
            "Aapka sawal kaafi interesting hai. Iska sahi jawab dene ke liye mujhe thoda aur context chahiye hoga. Kya hum is par discovery call pe baat kar sakte hain?",
            "Main aapki baat gehrayi se samajh raha hoon. Par bina audit ke kuch bhi kehna jaldbaazi hogi. 'Clarity provides confidence'. Chaliye ek call set karte hain?",
            "Bechdenge par hum har brand ko unique samajhte hain. Aapka case bhi special ho sakta hai. Kya aap 15 mins nikal sakte hain discussion ke liye?",
            "Sahi system aur sahi strategy... yahi do cheezein business badalti hain. Aapke case mein kya apply hoga, wo discuss karne ke liye call book karein."
        ];

        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newUserMessage = { id: messages.length + 1, text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, newUserMessage]);
        const currentInput = inputValue;
        setInputValue("");

        // Simulate Vijay's calm, practical response
        setTimeout(() => {
            const vijayResponse = getVijayResponse(currentInput);
            const newBotMessage = { id: messages.length + 2, text: vijayResponse, sender: 'bot' };
            setMessages(prev => [...prev, newBotMessage]);
        }, 800);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="btn-primary"
                    style={{
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.5)'
                    }}
                >
                    <MessageSquare size={24} color="white" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="glass-card" style={{
                    width: '350px',
                    height: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '1rem',
                        background: 'var(--gradient-main)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: 'white'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '30px', height: '30px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Bot size={18} color="var(--color-primary)" />
                            </div>
                            <span style={{ fontWeight: '600' }}>Vijay's Digital Agent</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div style={{
                        flex: 1,
                        padding: '1rem',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        {messages.map((msg) => (
                            <div key={msg.id} style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '85%',
                                padding: '0.8rem 1rem',
                                borderRadius: '12px',
                                borderBottomLeftRadius: msg.sender === 'bot' ? '2px' : '12px',
                                borderBottomRightRadius: msg.sender === 'user' ? '2px' : '12px',
                                background: msg.sender === 'user' ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)',
                                color: 'white',
                                fontSize: '0.9rem',
                                border: msg.sender === 'bot' ? '1px solid var(--color-border)' : 'none',
                                lineHeight: '1.5'
                            }}>
                                {msg.text.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                                {msg.text.includes('/booking') && (
                                    <div style={{ marginTop: '0.75rem' }}>
                                        <a href="/booking" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', width: 'auto' }}>Book Discovery Call</a>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div style={{
                        padding: '1rem',
                        borderTop: '1px solid var(--color-border)',
                        display: 'flex',
                        gap: '0.5rem'
                    }}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: '1px solid var(--color-border)',
                                borderRadius: '20px',
                                padding: '0.5rem 1rem',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                        <button
                            onClick={handleSend}
                            style={{
                                background: 'var(--color-primary)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '35px',
                                height: '35px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'white'
                            }}
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
