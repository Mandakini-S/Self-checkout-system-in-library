import React from "react";
import "./Navbar.css";
import { TU_Logo , CompanyLogo } from "../assets/constant";
const Navbar = () => {
    return (<>
        <div className="Header">

  <img id="Tulogo" src={TU_Logo} alt="Tribhuvan University Logo" />
  <div id="heading">
    <h4>Tribhuvan University</h4>
    <h2>Institute of Engineering</h2>
    <h1>Pashchimanchal Campus</h1>
    <h4>Lamachaur-16, Pokhara</h4>
  </div>
  <img id="companylogo" src={CompanyLogo} alt="Tribhuvan University Logo" />
</div>
</>
    );
};

export default Navbar;