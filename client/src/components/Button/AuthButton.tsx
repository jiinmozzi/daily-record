import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"

import signout from "../../api/signout";
import "./AuthButton.scss";

type AuthButtonPropsType = {
    type : string
}

const AuthButton = ({type} : AuthButtonPropsType) => {
    const navigate = useNavigate();
    const [button, setButton] = useState<string>("");
    useEffect(() => {
        setButton(type);
    }, [type])
    const onClick = (e : React.MouseEvent) => {
        switch(button){
            case "Sign in":
                navigate('/signin');
                break;
            case "Sign out":
                sessionStorage.removeItem("isLoggedIn");
                const signoutUser = async() => {
                    return await signout();
                }
                signoutUser();
                window.location.href = "/";
                break;
            case "Sign up":
                navigate("/signup");
                break;
            default:
                break;
        } 
    }
    return (
        <div className="auth-button" onClick={onClick}>{button}</div>
    )
}

export default AuthButton