import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Team', path: '/team' },
    { name: 'Events', path: '/events' },
    { name: 'Resources', path: '/resources' },
  ];

  return (
    <nav
      className={scrolled ? 'glass' : ''}
      style={{
        position: 'fixed',
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(3, 7, 18, 0.7)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--color-border)' : 'none',
        backdropFilter: scrolled ? 'blur(10px)' : 'none'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '90px' }}>
        <Link to="/" style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="/favicon.png" alt="Bechdenge Logo" style={{ height: '45px', width: 'auto' }} />
          <span>Bechdenge<span className="text-gradient">.com</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={location.pathname === link.path ? 'text-gradient' : ''}
              style={{
                fontSize: '0.95rem',
                fontWeight: location.pathname === link.path ? '600' : '400',
                color: location.pathname === link.path ? 'white' : 'var(--color-text-secondary)',
                position: 'relative',
              }}
            >
              {link.name}
              {location.pathname === link.path && (
                <span style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'var(--gradient-main)',
                  borderRadius: '2px'
                }} />
              )}
            </Link>
          ))}
          <Link to="/booking" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Book Now</Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'none' }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="glass" style={{
          position: 'absolute',
          top: '90px',
          left: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          borderTop: '1px solid var(--color-border)',
          height: 'calc(100vh - 90px)',
          overflowY: 'auto'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{
                padding: '1.5rem 0',
                borderBottom: '1px solid var(--color-border)',
                fontSize: '1.2rem',
                fontWeight: '600',
                color: location.pathname === link.path ? 'var(--color-primary)' : 'white'
              }}
            >
              {link.name}
            </Link>
          ))}
          <div style={{ marginTop: '2rem' }}>
            <Link to="/booking" onClick={() => setIsOpen(false)} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Book Now</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
