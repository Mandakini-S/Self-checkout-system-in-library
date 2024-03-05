//ScanModal.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const ScanModal = ({ showModal, closeModal }) => {
  const navigate = useNavigate();

    const handleDialogClick = () => {
        // Close the modal regardless of where the click occurs in the overlay
        closeModal();
      };
    
      const handleContentClick = (event) => {
        // Prevent the click event from propagating to the overlay
        event.stopPropagation();
      };

      const sendToBackend = async (value) => {
        const backendEndpoint = `http://127.0.0.1:8000/combined-data/${value}`;
        let responseData = null; // Variable to store the response data


        try {
            const response = await axios.get(
                backendEndpoint,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            if (response.status === 200) {
                responseData = response.data; // Store the response data
                navigate("/bookdetails", { state: { responseData } })

                console.log('Response from backend:', responseData);

                if (responseData.someValue) {
                    console.log('Some value exists in the response');
                }
            } else {
                console.error('Failed to get response from backend');
            }
        } catch (error) {
            console.error('Error while communicating with backend', error);
        }


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
                sendToBackend(value);
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
    <div className={`modal-overlay ${showModal ? 'modal-open' : ''}`} onClick={handleDialogClick}>
    <dialog open={showModal} className="modal">
      <div id="scancard" onClick={handleContentClick}>
        <h1 id="text1">SCAN </h1>
        <h3 id="text2">the tag in book below to get it's information.</h3>
        <FontAwesomeIcon icon={faArrowDown} style={{ color: '#4D90FE', fontSize: '40px' }} />
        {/* Simulated button for scanning RFID card */}
        <button onClick={handleRFIDScan} id="openSerialPort" className="scan-button">
                    Scan NFC tag on book
                </button>
        {/* Add content specific to returning book modal */}
        <button className="btn" onClick={closeModal}>Close</button>
      </div>
    </dialog>
  </div>
  );
};

export default ScanModal;
