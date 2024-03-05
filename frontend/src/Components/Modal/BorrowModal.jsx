import React ,{useState}from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BorrowModal = ({ showModal, closeModal,responseData }) => {
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();
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
        const uid = value.trim(); // Remove leading and trailing whitespace characters

  
        // Get the current date
        const currentDate = new Date();
        const issue_date = currentDate.toISOString().split('T')[0]; // Get YYYY-MM-DD format
        
        const sc_uid = localStorage.getItem("sc_uid");
  
        // Calculate the expiry date (90 days after the current date)
        const expiryDate = new Date();
        expiryDate.setDate(currentDate.getDate() + 90);
        const expiry_date = expiryDate.toISOString().split('T')[0]; // Get YYYY-MM-DD format
  
        // Send the UID, current date, and expiry date to the backend
        sendToBackend(sc_uid, uid, issue_date, expiry_date);
      }
    } catch (error) {
      console.error('Error reading RFID data', error);
    }
    textReader.cancel();
    await port.close();
    await port.forget();
};

const sendToBackend = async (sc_uid, b_uid, issue_date, expiry_date) => {
    const backendEndpoint = 'http://127.0.0.1:8000/cartapi/';
  
    try {
      console.log('Data sent to backend:', {
        sc_uid: sc_uid,
        b_uid: b_uid,
        issue_date: issue_date,
        expiry_date: expiry_date
      });
  
      const response = await axios.post(backendEndpoint, {
        sc_uid: sc_uid,
        b_uid: b_uid,
        issue_date: issue_date,
        expiry_date: expiry_date
      });
  
      console.log('Response to backend:', response);
      setSuccessMessage(true); // Set success message state to true

      setTimeout(() => {
        navigate("/home"); // Navigate after a delay
        closeModal();
      }, 2000); // 2 seconds delay
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
    
};




  return (
    <div className={`modal-overlay ${showModal ? 'modal-open' : ''}`} onClick={handleDialogClick}>
      <dialog open={showModal} className="modal">
        <div id="scancard">
        {successMessage ? (
            <div>
              <h3>Data has been successfully entered!</h3>
            </div>
          ) : (<>
          <h1 id="text1">SCAN </h1>
          <h3 id="text2">the tag in book below for entry</h3>
          <FontAwesomeIcon icon={faArrowDown} style={{ color: '#4D90FE', fontSize: '40px' }} />
          <button onClick={handleRFIDScan} className="scan-button">
            Scan RFID Card
          </button>
          <button className="btn" onClick={closeModal}>Close</button>
          </>)}
        </div>
      </dialog>
    </div>
  );
};

export default BorrowModal;
