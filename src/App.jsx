import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';

import Team from './pages/Team';
import Events from './pages/Events';
import Certificates from './pages/Certificates';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import Resources from './pages/Resources';
import PrivacyPolicy from './pages/PrivacyPolicy';
// Placeholder components for other pages to avoid build errors for now
import Services from './pages/Services';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Team />} />
            <Route path="/events" element={<Events />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
