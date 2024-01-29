import React from "react";
import { useNavigate } from "react-router-dom";
import './ScanCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const ScanCard = () => {
    const navigate = useNavigate();

    const handleRFIDScan = () => {
        // Perform any necessary logic for RFID card scanning
        // For example, check if the card is valid

        // Once the card is scanned and validated, navigate to the new page
        navigate("/home"); // Replace "/new-page" with the desired path
    };

    return (
        <div className="card1">
            <h1>Welcome to the Library System!</h1>
            <div id="scancard">
                <h1 id="text1">SCAN </h1>
                <h3 id="text2">Your card below for book transaction.</h3>
                <FontAwesomeIcon icon={faArrowDown} style={{ color: '#4D90FE', fontSize: '40px' }} />
                {/* Simulated button for scanning RFID card */}
                <button onClick={handleRFIDScan} className="scan-button">
                    Scan RFID Card
                </button>
            </div>
        </div>
    );
};

export default ScanCard;
