import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import "../../styles/Reset.scss";
import "./Header.scss";

const Header = () => {
    return (
        <div className="header-wrapper">
            <img id="logo" src={logo} alt="logo" />
        </div>
    )
}

export default Header;