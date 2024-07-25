import React from 'react';
import '../../style/Modal.css'; 

const Modal = ({ message, onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <p>{message}</p>
          <button className="modal-close-button" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    );
  };
  
  export default Modal;