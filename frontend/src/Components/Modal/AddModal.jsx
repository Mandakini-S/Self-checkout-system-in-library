import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const AddModal = ({ showModal, closeModal }) => {
  const navigate = useNavigate();

  const handleContentClick = (event) => {
    event.stopPropagation();
    // Simulate scanning a book and navigate to another page
    // navigate('/addbook');
  };

  const handleRFIDScan = async () => {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });

    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const textReader = textDecoder.readable.getReader();
    

    // while (port.readable && keepReading){
    //     reader = port.readable.getReader();
    // }
    try {
        while (true) {
            const { value, done } = await textReader.read();
            if (done) {
                textReader.releaseLock();
                break;
            }

            console.log(value);

            // Send the scanned value to the backend
            navigate("/addbook", { state: { value } })
            // sendToBackend(value);
            //await readable.close();
            await readableStreamClosed;
        }
    } catch (error) {
        console.error('Error reading RFID data', error);
    }
    textReader.cancel();
    await port.close();
    await port.forget();


};

  return (
    <div className={`modal-overlay ${showModal ? 'modal-open' : ''}`} onClick={closeModal}>
      <dialog open={showModal} className="modal">
        <div id="scancard" onClick={handleContentClick}>
          <h1 id="text1">SCAN </h1>
          <h3 id="text2">the tag in the book below for adding the book.</h3>
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

export default AddModal;
