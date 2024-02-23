import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import ScanCard from "./Components/ScanCard/ScanCard";
import Home from "./Components/UserHome/Home";
import EnterBook from "./Components/EnterBook/EnterBook";
import AdminHome from "./Components/AdminHome/AdminHome";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
  <Navbar />
    <Routes>
    <Route path="/" element={<ScanCard />} />
    <Route path="/home" element={<Home/>} />
    <Route path="/adminhome" element={<AdminHome/>} />
    <Route path="/addbook" element={<EnterBook/>} />
    </Routes>
    
</BrowserRouter>
    </div>
  );
}

export default App;
