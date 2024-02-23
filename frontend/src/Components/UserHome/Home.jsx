import React, { useState } from 'react';
import { person } from "../assets/constant";
import BorrowModal from '../Modal/BorrowModal';
import ReturnModal from '../Modal/ReturnModal';
import "./Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { tableData } from "../assets/constant";

const Home = () => {
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);

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

  const props = { person, tableData };


    return (<div className="Home">

        <div id="desc">
            <div id="desc_left">
                <h1 className="intro1">Welcome, {props.person.name}!</h1>
                <h3>{props.person.faculty}</h3>
            </div>
            <div id="desc_right"><h4>Roll no: {props.person.roll_no}</h4></div>
        </div>

        <div id="title-box">
        <FontAwesomeIcon icon={faListUl} style={{ color:"white", fontSize: '35px', margin:"14px" }}/>
        {/* <FontAwesomeIcon icon={faArrowDown}  /> */}
            <h3><span style={{fontSize:"38px", fontWeight:"400"}}>Issued Books</span> Your Issued Books Information</h3>
        </div>
        <table className="my-table">
      <thead>
        <tr>
          <th>S.N</th>
          <th>Accession No</th>
          <th>Title</th>
          <th>Issued Date</th>
          <th>Returning Date</th>
          <th>Due Days</th>
          
          
        </tr>
      </thead>
      <tbody>
        {tableData.map((row) => (
          <tr key={row.sno}>
            <td>{row.sno}</td>
            <td>{row.accessionNo}</td>
            <td>{row.title}</td>
            <td>{row.issue_date}</td>
            <td>{row.return_date}</td>
            <td>{row.due_date}</td>
          </tr>
        ))}
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
