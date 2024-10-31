// src/components/Button.jsx
import React from 'react';

const Button = ({ text, onClick, style }) => {
    return (
        <>
            <style>
                {`
                    .custom-button {
                        padding: 0.5rem 1rem;
                        background-color: #4caf50;
                        color: #fff;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 1rem;
                        transition: background-color 0.3s ease; /* Smooth transition for hover effect */
                    }

                    .custom-button:hover {
                        background-color: #45a049; /* Darker shade on hover */
                    }

                    .custom-button:active {
                        background-color: #388e3c; /* Even darker shade on click */
                    }
                `}
            </style>
            <button className="custom-button" onClick={onClick} style={style}>
                {text}
            </button>
        </>
    );
};

export default Button;
