import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConfirmModal = ({ showModal, closeModal, dataSummary, Question }) => {
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleDialogClick = () => {
    closeModal();
  };

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postData = {
      b_uid: dataSummary.uid,
      book_name: dataSummary.title,
      author: dataSummary.author,
      volume: dataSummary.category,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/bookapi/",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Server response:", response.data);

      setSuccessMessage(true); // Set success message state to true

      setTimeout(() => {
        navigate("/adminhome"); // Navigate after a delay
        closeModal();
      }, 2000); // 2 seconds delay

    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className={`modal-overlay ${showModal ? 'modal-open' : ''}`} onClick={handleDialogClick}>
      <dialog open={showModal} className="modal">
        <div id="scancard" onClick={handleContentClick}>
          {successMessage ? (
            <div>
              <h3>Data has been successfully entered!</h3>
            </div>
          ) : (
            <>
              <h3 id="text2">{Question}</h3>
              <h3 style={{ fontWeight: "normal", margin: "40px" }}>
                Title: {dataSummary.title}<br />
                Author: {dataSummary.author}<br />
                Category: {dataSummary.category}
              </h3>
              <div>
                <button className="btn" onClick={handleSubmit}>Submit</button>
                <button className="btn" onClick={closeModal}>Close</button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ConfirmModal;
