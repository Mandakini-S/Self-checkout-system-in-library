import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const BorrowModal = ({ showModal, closeModal,responseData }) => {

  const handleDialogClick = () => {
    // Close the modal regardless of where the click occurs in the overlay
    closeModal();
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
  
        // Extract the UID from the scanned value
        const uid = value;
  
        // Get the current date
        const currentDate = new Date();
  
        // Calculate the expiry date (90 days after the current date)
        const expiryDate = new Date();
        expiryDate.setDate(currentDate.getDate() + 90);
  
        // Send the UID, current date, and expiry date to the backend
        sendToBackend(responseData.sc_uid, uid, currentDate, expiryDate);
      }
    } catch (error) {
      console.error('Error reading RFID data', error);
    }
  };
  
  const sendToBackend = async (sc_uid, b_uid, issue_date, expiry_date) => {
    const backendEndpoint = 'http://127.0.0.1:8000/cartapi/';
  
    try {
      console.log('Data sent to backend:', {
        sc_uid: responseData.sc_uid,
        b_uid: b_uid,
        issue_date: issue_date.toISOString(),
        expiry_date: expiry_date.toISOString()
      });
  
      const response = await axios.post(backendEndpoint, {
        sc_uid: sc_uid,
        b_uid: b_uid,
        issue_date: issue_date.toISOString(),
        expiry_date: expiry_date.toISOString()
      });
  
      console.log('Response to backend:', response);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };
  


  return (
    <div className={`modal-overlay ${showModal ? 'modal-open' : ''}`} onClick={handleDialogClick}>
      <dialog open={showModal} className="modal">
        <div id="scancard">
          <h1 id="text1">SCAN </h1>
          <h3 id="text2">the tag in book below for entry</h3>
          <FontAwesomeIcon icon={faArrowDown} style={{ color: '#4D90FE', fontSize: '40px' }} />
          <button onClick={handleRFIDScan} className="scan-button">
            Scan RFID Card
          </button>
          <button className="btn" onClick={closeModal}>Close</button>
        </div>
      </dialog>
    </div>
  );
};

export default BorrowModal;
