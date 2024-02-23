// ConfirmModal.jsx
import React from 'react';


const ConfirmModal = ({ showModal, closeModal, dataSummary, Question }) => {
  const handleDialogClick = () => {
    closeModal();
  };

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Do something with the submitted data, e.g., send it to a server
    console.log("Submitted data:", { dataSummary });

    // Close the modal after submitting
    closeModal();
  };

  return (
    <div className={`modal-overlay ${showModal ? 'modal-open' : ''}`} onClick={handleDialogClick}>
      <dialog open={showModal} className="modal">
        <div id="scancard" onClick={handleContentClick}>
          <h3 id="text2">{Question}</h3>
          <h3 style={{fontWeight:"normal", margin:"40px"}}>{dataSummary}</h3>
          <div>
          <button className="btn" onClick={handleSubmit}>Submit</button>
          <button className="btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ConfirmModal;

