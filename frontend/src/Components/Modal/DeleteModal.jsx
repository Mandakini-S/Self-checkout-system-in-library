// DeleteModal.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const DeleteModal = ({ showModal, closeModal }) => {
    const navigate = useNavigate();
    const handleDialogClick = () => {
        // Close the modal regardless of where the click occurs in the overlay
        closeModal();
    };

    const handleContentClick = (event) => {
        // Prevent the click event from propagating to the overlay
        event.stopPropagation();
    };

    const sendToBackend = async (b_uid) => {
        const backendEndpoint = `http://127.0.0.1:8000/bookapi/`;

        try {
            const response = await axios.delete(
               ` ${backendEndpoint}${b_uid}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                console.log('Book deleted successfully');
                // Close modal or perform other actions upon successful deletion
                closeModal();
                navigate ("/adminhome");
            } else {
                
                console.error('Failed to delete book');
            }
        } catch (error) {
            console.error('Error while communicating with backend', error);
        }
    };

    const handleRFIDScan = async () => {
      // Prompt user to select any serial port.
      const port = await navigator.serial.requestPort();
  
      // Wait for the serial port to open.
      await port.open({ baudRate: 115200 });
  
      // Text decoding
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const textReader = textDecoder.readable.getReader();
  
      // Listen to data coming from the serial device.
      try {
          while (true) {
              const { value, done } = await textReader.read();
              if (done) {
                  // Allow the serial port to be closed later.
                  textReader.releaseLock();
                  break;
              }
              // value is a string.
              console.log(value);
  
              // Send the scanned value to the backend
              sendToBackend(value);
          }
      } catch (error) {
          console.error('Error reading RFID data', error);
      }
  
      textReader.cancel();
      await port.close();
      await port.forget();
  };
  






  return (
    <div className={`modal-overlay ${showModal ? 'modal-open' : ''}`} onClick={handleDialogClick}>
    <dialog open={showModal} className="modal">
      <div id="scancard" onClick={handleContentClick}>
        <h1 id="text1">SCAN </h1>
        <h3 id="text2">the tag in book below for deleting book.</h3>
        <FontAwesomeIcon icon={faArrowDown} style={{ color: '#4D90FE', fontSize: '40px' }} />
        {/* Simulated button for scanning RFID card */}
        <button onClick={handleRFIDScan} id="openSerialPort" className="scan-button">
                    Scan RFID Card
                </button>
        {/* Add content specific to returning book modal */}
        <button className="btn" onClick={closeModal}>Close</button>
      </div>
    </dialog>
  </div>
  );
};

export default DeleteModal;