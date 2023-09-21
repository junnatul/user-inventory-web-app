import React, { useState } from 'react';

function Modal({ isOpen, onClose, onSubmit, children }) {
  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default Modal;
