// src/pages/PrivacyPolicy.jsx
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <style>
        {`
          .privacy-policy {
              max-width: 800px;
              margin: 50px auto;
              padding: 20px;
              background-color: #f7f9fc;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              font-family: Arial, sans-serif;
              color: #333;
          }

          .privacy-policy h1 {
              font-size: 2rem;
              color: #2c3e50;
              margin-bottom: 10px;
              text-align: center;
          }

          .privacy-policy h2 {
              font-size: 1.5rem;
              color: #4CAF50;
              margin-top: 20px;
          }

          .privacy-policy p {
              font-size: 1rem;
              line-height: 1.6;
              margin-bottom: 15px;
          }

          .privacy-policy a {
              color: #4CAF50;
              text-decoration: none;
          }

          .privacy-policy a:hover {
              text-decoration: underline;
          }
        `}
      </style>
      
      <h1>Privacy Policy</h1>
      <p>
        We are committed to protecting your privacy. This privacy policy outlines how we handle your personal information to provide you with a safe and secure experience.
      </p>
      
      <h2>Information We Collect</h2>
      <p>
        We may collect personal information such as your name, email address, and mental health details to provide tailored recommendations and support. Your data is collected only with your consent and for the purpose of improving your mental health journey.
      </p>

      <h2>How We Use Your Information</h2>
      <p>
        The information we collect is used to enhance our services and provide personalized recommendations based on your responses to the questionnaire. We take security measures to protect your data from unauthorized access.
      </p>

      <h2>Data Protection</h2>
      <p>
        Your privacy is a priority, and we implement strict data protection protocols. We ensure that your information is stored securely and only accessible by authorized personnel.
      </p>

      <h2>Changes to Our Privacy Policy</h2>
      <p>
        We may update our privacy policy from time to time. Any changes will be communicated to you via email or on our website to keep you informed.
      </p>

      <p>If you have any questions about our privacy practices, feel free to <a href="mailto:support@mentalhealthwebsite.com">contact us</a>.</p>
    </div>
  );
};

export default PrivacyPolicy;
