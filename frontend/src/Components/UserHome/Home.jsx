import React, { useState, useEffect } from 'react';
import { person } from "../assets/constant";
import BorrowModal from '../Modal/BorrowModal';
import ReturnModal from '../Modal/ReturnModal';
import "./Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { tableData } from "../assets/constant";
import axios from "axios";

const Home = () => {

 // to fetch data
 const [students,setStudents] = useState([])
 useEffect(()=>{
   async function getALLStudent(){
     try{
       const students = await axios.get("http://127.0.0.1:8000/cartapi/")
       console.log(students.data)
       setStudents(students.data)
     } catch(error){
       console.log(error)
     }
   }
   getALLStudent()
 },[])

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

  // const props = { person, tableData };
  const props = { person, students };

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
    {students.map((student, index) => (
      <tr key={student.accession_no}>
      <td>{index + 1}</td>
        {/* <td>{student.sno}</td> */}
        <td>{student.accession_no}</td>
        <td>{student.b_uid}</td>
        <td>{student.issue_date}</td>
        <td>{student.expiry_date}</td>
        <td>{student.sc_uid}</td>
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
