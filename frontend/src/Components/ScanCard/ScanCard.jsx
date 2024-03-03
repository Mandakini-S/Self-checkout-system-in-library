import React from "react";
import { useNavigate } from "react-router-dom";
import './ScanCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const ScanCard = () => {
    const navigate = useNavigate();

    const sendToBackend = async (scannedValue) => {
        const backendEndpoint = 'http://127.0.0.1:8000/check-student-existence/';
        
        try {
            const response = await fetch(backendEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sc_uid: scannedValue }),
            });

            if (response.ok) {
                const responseData = await response.json();

                // Check if the response indicates that the RFID exists
                if (responseData.exists) {
                    console.log('Scanned value exists in the backend');

                    // Store the value (you can use localStorage or any state management)
                    // For example, using localStorage:
                    localStorage.setItem('scannedValue', scannedValue);

                    // Navigate to /home
                    navigate("/home");
                } else {
                    console.log('Scanned value does not exist in the backend');
                }
            } else {
                console.error('Failed to send scanned value to backend');
            }
        } catch (error) {
            console.error('Error while sending data to backend', error);
        }
    };

    const handleRFIDScan = async () => {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });

        const textDecoder = new TextDecoderStream();
        const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
        const textReader = textDecoder.readable.getReader();

        try {
            while (true) {
                const { value, done } = await textReader.read();
                if (done) {
                    textReader.releaseLock();
                    break;
                }
                console.log(value);

                // Send the scanned value to the backend
                sendToBackend(value);
            }
        } catch (error) {
            console.error('Error reading RFID data', error);
        }
    };

    return (
        <div className="card1">
            <h1>Welcome to the Library System!</h1>
            <div id="scancard">
                <h1 id="text1">SCAN </h1>
                <h3 id="text2">Your card below for book transaction.</h3>
                <FontAwesomeIcon icon={faArrowDown} style={{ color: '#4D90FE', fontSize: '40px' }} />
                <button onClick={handleRFIDScan} id="openSerialPort" className="scan-button">
                    Scan RFID Card
                </button>
            </div>
        </div>
    );
};

export default ScanCard;

