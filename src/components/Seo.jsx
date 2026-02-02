import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Seo = ({ title, description, keywords }) => {
    const location = useLocation();

    useEffect(() => {
        // Update Title
        document.title = title ? `${title} | Bechdenge.com` : 'Bechdenge.com | Amazon PPC & E-commerce Expert';

        // Update Meta Description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = description || 'Expert Amazon PPC optimization, Google Ads management, and E-commerce growth strategies by Vijay Savani.';

        // Update Keywords (Optional but good for some engines)
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = 'keywords';
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.content = keywords || 'Amazon PPC, Ecommerce Expert, Google Ads, Amazon Advertising, Vijay Savani, Digital Marketing';

        // Canonical Link (Avoid duplicate content issues)
        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (!linkCanonical) {
            linkCanonical = document.createElement('link');
            linkCanonical.rel = 'canonical';
            document.head.appendChild(linkCanonical);
        }
        linkCanonical.href = window.location.href;

    }, [title, description, keywords, location]);

    return null; // This component doesn't render anything visual
};

export default Seo;
