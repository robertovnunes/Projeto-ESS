import React from 'react';
import '../../style/button.css';


const Button = ({ children, onClick, className }) => {
    return (
        <div className={`button ${className}`} onClick={onClick}>
            {children};
        </div>
        );
    };

export default Button;