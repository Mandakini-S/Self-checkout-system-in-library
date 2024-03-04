
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { person } from "../assets/constant";
import "./ShowBookDetails.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from "@fortawesome/free-solid-svg-icons";
const ShowBookDetails = () => {
    const props = { person }
    const location = useLocation();
    const { responseData } = location.state;
    useEffect(() => {
        console.log('Response received from navigate:', responseData);
    }, [responseData]); // Run the effect only when responseData changes

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

    return (<div>
        {/* <div id="desc_left">
        <h1 style={{fontSize:"30px",marginBottom:}}>Hello, {props.person.name}!</h1>
        <h3 style={{fontWeight:"300", fontSize:"16px"}}>{props.person.email}</h3>
      </div> */}

        <div id="title-box" style={{ marginTop: "20px" }}>
            <FontAwesomeIcon icon={faListUl} style={{ color: "white", fontSize: '35px', margin: "14px" }} />
            <h3><span style={{ fontSize: "38px", fontWeight: "400" }}>Issued Book</span>Issued Book Information</h3>
        </div>

        <table className="my-table" style={{ margin: "30px" }}>
            <thead>
                <tr>
                    <th >S.N:</th>
                    <th>Accession No:</th>
                    <th>Student Name:</th>
                    <th>Roll No:</th>
                    <th>Issued Date:</th>
                    <th>Returning Date:</th>
                    <th>Fine:</th>
                </tr>
            </thead>
            <tbody>
                {responseData && responseData.map((data, index) => {
                    try {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.accession_no}</td>
                                <td>{data.student_name}</td>
                                <td>{data.roll_no}</td>
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
    </div>
    );
};

export default ShowBookDetails;



