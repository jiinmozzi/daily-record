import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
import main_bg from "../../assets/introduction_bg.jpeg";
import logo from "../../assets/logo.png";
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
// import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
// import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
// import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
// import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
// import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import Navigation from "../../components/Navigation";
import { useRecoilState } from "recoil";
import { UserType } from "../../types";
import { accessTokenState, userState, isLoggedInState } from "../../store/atom";

import signout from "../../api/signout";
import "./main.scss";

const Main = () => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState<UserType>(userState);
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState<boolean>(isLoggedInState); 
    useEffect(() => {
        console.log(user);
        console.log(accessToken);
    }, [user, accessToken])

    const onClickSignout = async() => {
        sessionStorage.removeItem("isLoggedIn");
        const signoutUser = async () => {
            return await signout();
        }
        signoutUser();
        window.location.href="/";
    }

    return (
        <div className="main-wrapper">
            <img className="main-logo" src={logo} alt="logo" />
            
            <Navigation />
            {/* <div className="nav">
                <HomeRoundedIcon className="main-icon" onClick={() => navigate('/home')}/>
                <CalendarMonthRoundedIcon className="main-icon" onClick={() => navigate('/home')}/>
                <FlightTakeoffRoundedIcon className="main-icon" onClick={() => navigate('/travel')}/>
                <TerminalRoundedIcon className="main-icon" onClick={() => navigate('/terminal')}/>
                <FitnessCenterRoundedIcon className="main-icon" onClick={() => navigate('/fitness')}/>
                <AutoStoriesRoundedIcon className="main-icon" onClick={() => navigate('/book')}/>
                <CreateRoundedIcon className="main-icon" onClick={() => navigate('/diary')}/>
            </div> */}
            <div className="main-background"></div>

            {!isLoggedIn && <div className="main-auth-nav">
                <div className="sign-up">
                    <span>Not a member yet ?</span>
                    <span className="sign-up-span" onClick={() => navigate('/signup')}>Sign up</span>
                </div>
                <div className="sign-in">
                    <span>Already have an account ?</span>
                    <span className="sign-in-span" onClick={() => navigate('/signin')}>Sign in</span>
                </div>
            </div>}
            {isLoggedIn && <div className="sign-out" onClick={onClickSignout}>Sign out</div>}
            
        </div>
    )
}
export default Main;