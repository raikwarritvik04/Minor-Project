import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate(); // Hook to navigate between pages

  return (
    <div className="privacy-policy">
      <style>
        {`
          body {
            background-color: #E6E6FA;
            }
          .privacy-policy {
            max-width: 750px;
            display: flex;
            flex-direction: column;
            margin: 70px auto; /* Sets 40px margin at the top and bottom */
            background-color: #F5F5F5;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            font-family: Arial, sans-serif;
            color: #333;
            border-radius: 10px;
            border: 2px solid #4CAF50;
            padding: 2rem; /* Adds spacing around the content */
            min-height: calc(100vh - 80px); /* Ensures the page extends as needed, minus top and bottom margins */
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

          .back-button {
              position: absolute;
              left: 20px;
              top: 20px;
              padding: 10px 20px;
              border: 2px solid #4CAF50;
              border-radius: 5px;
              background-color: white;
              cursor: pointer;
              color: #4CAF50;
              font-weight: bold;
              transition: transform 0.3s ease, background-color 0.3s ease;
          }
        
          /* Entrance animation for back and help buttons */
            .back-button {
                left: 20px;
                animation: slideInLeft 0.8s ease-out;
            }

          .back-button:hover {
              background-color: #4CAF50;
              color: white;
          }

          /* Keyframes for entrance animations */
          @keyframes slideInLeft {
              from {
                  opacity: 0;
                  transform: translateX(-50px);
              }
        `}
      </style>

      {/* Back button */}
      <div className="back-button" onClick={() => navigate('/')}>Back</div>

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
