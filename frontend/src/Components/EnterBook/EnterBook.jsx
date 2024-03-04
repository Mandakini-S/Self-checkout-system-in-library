// EnterBook.jsx
import React, { useState, useEffect } from "react";
import ConfirmModal from "../Modal/ConfirmModal";
import { useLocation } from 'react-router-dom';

import "./EnterBook.css";

const EnterBook = () => {
  const [bookUid, setBookUid] = useState("");
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [edition, setEdition] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [Question, setQuestion] = useState("");
  const [dataSummary, setDataSummary] = useState({
    uid: "",  // Set to an empty string initially
    title: "",
    author: "",
    category: "",
  });

  const location = useLocation();
const {value} = location.state;
  useEffect(() => {
    console.log('Response received from navigate:', value);
  }, [value]); // Run the effect only when responseData changes
  const handleBookNameChange = (event) => {
    setBookName(event.target.value);
  };

  const handleAuthorNameChange = (event) => {
    setAuthorName(event.target.value);
  };

  const handleEditionChange = (event) => {
    setEdition(event.target.value);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any of the fields is empty
    if (!bookName.trim() || !authorName.trim() || !edition.trim()) {
      setError("Please fill in all the fields");
      return;
    }

    // Reset error state
    setError("");

    // Set question
    const question = "Are you sure you want to add this book?";
    setQuestion(question);

    // Update dataSummary state
    setDataSummary({
      uid: value,
      title: bookName,
      author: authorName,
      category: edition,
    });

    // Open the confirmation modal
    handleOpenModal();
  };

  return (
    <div id="scancard1">
      <h1>Enter the following information.</h1>
      <form onSubmit={handleSubmit}>
      <label>
        Book Uid:
        <input style={{marginLeft:"20px"}} type="text" value={value} />
      </label>
        <label>
          Book Name:
          <input style={{marginLeft:"20px"}} type="text" value={bookName} onChange={handleBookNameChange} />
        </label>
        <label>
          Author Name:
          <input style={{marginLeft:"10px"}} type="text" value={authorName} onChange={handleAuthorNameChange} />
        </label>
        <label>
          Edition:
          <input style={{marginLeft:"53px"}} type="text" value={edition} onChange={handleEditionChange} />
        </label>
        <input type="submit" value="Submit" className="scan-button"/>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      {/* Include the ConfirmModal component */}
      <ConfirmModal showModal={showModal} closeModal={handleCloseModal} Question={Question} dataSummary={dataSummary} />
    </div>
  );
};

export default EnterBook;