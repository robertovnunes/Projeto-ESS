import React, { useState, useEffect } from 'react';
import '../../style/Snackbar.css'; // Vamos criar este arquivo de estilos em seguida

const Snackbar = ({ message, type, isOpen, onClose, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
        setIsVisible(isOpen);
        if (isOpen) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className={`snackbar ${type}`}>
            <p>{message}</p>
            <button onClick={onClose}>X</button>
        </div>
    );
};

export default Snackbar;