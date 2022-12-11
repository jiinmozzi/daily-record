import React from "react";
import logo from "../../assets/logo.png";
import Navigation from "../Navigation";
import AuthButton from "../Button/AuthButton";
import "../../styles/Reset.scss";
import "./Header.scss";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../../store/atom";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import signout from "../../api/signout";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState<boolean>(isLoggedInState);
    const signOut = async(e : React.MouseEvent ) => {
        e.preventDefault();
        const logout = async() => await signout();
        logout().then((res : any) => {
            if (res.message === "OK"){
                setIsLoggedIn(false);
                sessionStorage.removeItem("isLoggedIn");
                window.location.href="/";
            }
        })
        
    }
    return (
        <div className="header-wrapper">
            
            <div className="header-upper">
                <div className="empty"></div>
                <div className="main-logo">
                    <img id="logo" src={logo} alt="logo" />
                </div>
                {isLoggedIn ?   (
                <div className="auth-nav">
                    <LogoutIcon className="sign-out-btn" onClick={signOut}/>
                </div>) : ( 
                <div className="auth-nav">
                    <AuthButton type="Sign in"/>
                    
                    {/* <SocialDropDown /> */}
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