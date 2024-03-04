// Home.jsx
import React, { useState, useEffect } from 'react';
import { person } from "../assets/constant";
import BorrowModal from '../Modal/BorrowModal';
import ReturnModal from '../Modal/ReturnModal';
import "./Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from 'react-router-dom';


const Home = () => {
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
const location = useLocation();
const {responseData} = location.state;
  useEffect(() => {
    console.log('Response received from navigate:', responseData);
  }, [responseData]); // Run the effect only when responseData changes


// console.log('Response hereeee:', responseData);
  const openBorrowModal = () => {
    setShowBorrowModal(true);
  };

  const closeBorrowModal = () => {
    setShowBorrowModal(false);
  };

  const openReturnModal = () => {
    setShowReturnModal(true);
  };

  const closeReturnModal = () => {
    setShowReturnModal(false);
  };
  const calculateFine = (expiryDate) => {
    const expiryDateObj = new Date(expiryDate);
    const today = new Date();
  
    // Calculate the difference in milliseconds
    const differenceInMs = today - expiryDateObj;
  
    // Convert milliseconds to days
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
  
    // Fine calculation logic
    const finePerDay = 1; // Change this value as per your requirement
    const fine = differenceInDays > 0 ? differenceInDays * finePerDay : 0;
  
    return fine;
  };
  

  return (
    <div className="Home">
      <div id="desc">
        <div id="desc_left">
          {responseData && responseData.length > 0 && (
          <h1 className="intro1">Welcome, {responseData[0].student_name}!</h1>
        )}
          <h3>{person.faculty}</h3>
        </div>
        <div id="desc_right">{responseData && responseData.length > 0 && (
          <h4>Roll no: {responseData[0].roll_no}</h4>
        )}</div>
      </div>

      <div id="title-box">
        <FontAwesomeIcon icon={faListUl} style={{ color: "white", fontSize: '35px', margin: "14px" }}/>
        <h3><span style={{ fontSize: "38px", fontWeight: "400" }}>Issued Books</span> Your Issued Books Information</h3>
      </div>

      <table className="my-table">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Accession No</th>
            <th>Book Name</th>
            <th>Issued Date</th>
            <th>Returning Date</th>
            <th>Fine (Rs.)</th>
          </tr>
        </thead>
        <tbody>
        {responseData && responseData.map((data, index) => {
  try {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{data.accession_no}</td>
        <td>{data.book_name}</td>
        <td>{data.issue_date}</td>
        <td>{data.expiry_date}</td>
        <td>{calculateFine(data.expiry_date)}</td>
      </tr>
    );
  } catch (error) {
    console.error('Error rendering table row:', error);
    return null;
  }
})}

        </tbody>
      </table>

      <div>
        <button onClick={openBorrowModal}>Borrow Book</button>
        <button onClick={openReturnModal}>Return Book</button>
      </div>

      <BorrowModal showModal={showBorrowModal} closeModal={closeBorrowModal} />
      <ReturnModal showModal={showReturnModal} closeModal={closeReturnModal} />
    </div>
  );
};

export default Home;
