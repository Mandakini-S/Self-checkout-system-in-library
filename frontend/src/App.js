import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import ScanCard from "./Components/ScanCard/ScanCard";
import Home from "./Components/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
  <Navbar />
    <Routes>
    <Route path="/" element={<ScanCard />} />
    <Route path="/home" element={<Home/>} />
    </Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
