import React from "react";
import { useNavigate } from "react-router-dom";
import SocialDropDown from "../Dropdown/SocialDropDown";
import logo from "../../assets/logo.png";
import Navigation from "../Navigation";
import AuthButton from "../Button/AuthButton";
import "../../styles/Reset.scss";
import "./Header.scss";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../../store/atom";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState<boolean>(isLoggedInState);

    return (
        <div className="header-wrapper">
            
            <div className="header-upper">
                <div className="empty"></div>
                <div className="main-logo">
                    <img id="logo" src={logo} alt="logo" />
                </div>
                {isLoggedIn ?   (
                <div className="auth-nav">
                    <AuthButton type="Sign out"/>
                    {/* <SocialDropDown /> */}
                </div>) : ( 
                <div className="auth-nav">
                    <AuthButton type="Sign in"/>
                    
                    <SocialDropDown />
                </div> 
                )}
                
                
                
            </div>
            <div className="header-lower">
                <Navigation />
            </div>
            
        </div>
    )
}

export default Header;