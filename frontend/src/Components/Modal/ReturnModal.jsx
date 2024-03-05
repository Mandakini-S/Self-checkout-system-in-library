import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios for making HTTP requests
import './ReturnModal.css'; // Import the CSS file

const ReturnModal = ({ showModal, closeModal }) => {
  const handleDialogClick = () => {
    // Close the modal regardless of where the click occurs in the overlay
    closeModal();
  };

  const handleContentClick = (event) => {
    // Prevent the click event from propagating to the overlay
    event.stopPropagation();
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
        const uid = value.trim(); // Remove leading and trailing whitespace characters

  
        // Send the UID to the backend to delete the book
        sendToBackend(uid);
      }
    
    } catch (error) {
      console.error('Error reading RFID data', error);
    }
    textReader.cancel();
    await port.close();
    await port.forget();
  };
  
  const sendToBackend = async (b_uid) => {
    const backendEndpoint = 'http://127.0.0.1:8000/cartapi/';
  
    try {
      console.log('Data sent to backend:', {
      b_uid
      });
  
      const response = await axios.delete(`${backendEndpoint}${b_uid}`);
  
      console.log('Response to backend:', response);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <div className={`modal-overlay ${showModal ? 'modal-open' : ''}`} onClick={handleDialogClick}>
      <dialog open={showModal} className="modal">
        <div id="scancard" onClick={handleContentClick}>
          <h1 id="text1">SCAN </h1>
          <h3 id="text2">the tag in book below to return.</h3>
          <FontAwesomeIcon icon={faArrowDown} style={{ color: '#4D90FE', fontSize: '40px' }} />
          {/* Simulated button for scanning RFID card */}
          <button onClick={handleRFIDScan} className="scan-button">
            Scan RFID Card
          </button>
          {/* Add content specific to returning book modal */}
          <button className="btn" onClick={closeModal}>Close</button>
        </div>
      </dialog>
    </div>
  );
};

export default ReturnModal;

