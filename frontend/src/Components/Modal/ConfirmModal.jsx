// ConfirmModal.jsx
import React from 'react';
import axios from 'axios';

const ConfirmModal = ({ showModal, closeModal, dataSummary, Question }) => {
  const handleDialogClick = () => {
    closeModal();
  };

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
   
    const postData = { dataSummary };
  
    try {
      
      const response = await axios.post('http://127.0.0.1:8000/bookapi/', postData);
  
      // Log the response 
      console.log('Server response:', response.data);
  
      // Close the modal after submitting
      closeModal();
    } catch (error) {
      // Handle error appropriately
      console.error('Error submitting data:', error);
    }
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

