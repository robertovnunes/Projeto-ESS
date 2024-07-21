import React from 'react';
import '../../style/Modal.css'; 

const Modal = ({ message, onConfirm, onCancel }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <p>{message}</p>
          <div className="modal-buttons">
            <button className="confirm-button" onClick={onConfirm}>Sim</button>
            <button className="cancel-button" onClick={onCancel}>Não</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;