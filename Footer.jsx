// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>© 2024 True Care. All rights reserved.</p>
    </footer>
  );
};

const footerStyle = {
  textAlign: 'center',
  padding: '0.10rem', // Reduced padding to minimize height by half
  backgroundColor: '#E6E6FA',
  color: '#333',
  position: 'fixed',
  bottom: '0',
  width: '100%',
  left: '0', // Ensure it stays within the viewport
  zIndex: '1000', // Ensure it appears above other content if necessary
  height: 'auto', // Allow height to adjust based on content
};

// Note: Media queries are generally not applied in inline styles. 
// If needed, consider using a CSS file or CSS-in-JS library.

export default Footer;
