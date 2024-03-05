//ScanCard.jsx
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ScanCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const ScanCard = () => {
    const navigate = useNavigate();

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
                navigate("/home", { state: { responseData } })
               
                console.log('Response from backend:', responseData);
{/* <Routes>
  <Route path="/home" element={<Home responseData={response.data} />} />

</Routes> */}

                //  navigate("/home", { responseData });
    
            
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