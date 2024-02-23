import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const AddModal = ({ showModal, closeModal }) => {
  const navigate = useNavigate();

  const handleContentClick = (event) => {
    event.stopPropagation();
    // Simulate scanning a book and navigate to another page
    navigate('/addbook');
  };

  return (
    <div className={`modal-overlay ${showModal ? 'modal-open' : ''}`} onClick={closeModal}>
      <dialog open={showModal} className="modal">
        <div id="scancard" onClick={handleContentClick}>
          <h1 id="text1">SCAN </h1>
          <h3 id="text2">the tag in the book below for adding the book.</h3>
          <FontAwesomeIcon icon={faArrowDown} style={{ color: '#4D90FE', fontSize: '40px' }} />
          {/* Simulated button for scanning RFID card */}
          
          {/* Add content specific to returning book modal */}
          <button className="btn" onClick={closeModal}>Close</button>
        </div>
      </dialog>
    </div>
  );
};

export default AddModal;
