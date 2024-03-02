import React from "react";
import { useNavigate } from "react-router-dom";
import './ScanCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const ScanCard = () => {
    const navigate = useNavigate();

    // document.querySelector('openSerialPort').addEventListener('click', async () => {
    //     //The Prompt will open to user to select's any serial port.
    //     const port = await navigator.serial.requestPort();
    //     // Wait for the serial port to open.
    //     await port.open({ baudRate: 115200 });
    // });

    
    const handleRFIDScan = async () => {
        // Perform any necessary logic for RFID card scanning
    
        // Prompt user to select any serial port.
        const port = await navigator.serial.requestPort();
    
        // Wait for the serial port to open.
        await port.open({ baudRate: 115200 });
    
        const reader = port.readable.getReader();
        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                // Allow the serial port to be closed later.
                reader.releaseLock();
                break;
            }
            // value is a Uint8Array.
            console.log(value);
        }
    
        // Text decoding
        const textDecoder = new TextDecoderStream();
        const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
        const textReader = textDecoder.readable.getReader();
    
        // Listen to data coming from the serial device.
        while (true) {
            const { value, done } = await textReader.read();
            if (done) {
                // Allow the serial port to be closed later.
                textReader.releaseLock();
                break;
            }
            // value is a string.
            console.log(value);
        }
    
        // Once the card is scanned and validated, navigate to the new page
        // navigate("/home"); // Replace "/new-page" with the desired path
    };
    

    return (
        <div className="card1">
            <h1>Welcome to the Library System!</h1>
            <div id="scancard">
                <h1 id="text1">SCAN </h1>
                <h3 id="text2">Your card below for book transaction.</h3>
                <FontAwesomeIcon icon={faArrowDown} style={{ color: '#4D90FE', fontSize: '40px' }} />
                {/* Simulated button for scanning RFID card */}
                <button onClick={handleRFIDScan} id="openSerialPort" className="scan-button">
                    Scan RFID Card
                </button>
            </div>
        </div>
    );
};

export default ScanCard;
