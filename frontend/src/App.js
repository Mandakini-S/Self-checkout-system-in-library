import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import ScanCard from "./Components/ScanCard/ScanCard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
  <Navbar />
    <Routes>
    <Route path="/" element={<ScanCard />} />
    </Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
