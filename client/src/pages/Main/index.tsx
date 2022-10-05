import { useNavigate } from "react-router-dom";
import main_bg from "../../assets/introduction_bg.jpeg";
import logo from "../../assets/logo.png";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import "./main.scss";
const Main = () => {
    const navigate = useNavigate();
    return (
        <div className="main-wrapper">
            <img className="main-logo" src={logo} alt="logo" />
            
            
            <div className="nav">
                <HomeRoundedIcon className="main-icon" onClick={() => navigate('/home')}/>
                <CalendarMonthRoundedIcon className="main-icon" onClick={() => navigate('/home')}/>
                <FlightTakeoffRoundedIcon className="main-icon" onClick={() => navigate('/travel')}/>
                <TerminalRoundedIcon className="main-icon" onClick={() => navigate('/terminal')}/>
                <FitnessCenterRoundedIcon className="main-icon" onClick={() => navigate('/fitness')}/>
                <AutoStoriesRoundedIcon className="main-icon" onClick={() => navigate('/book')}/>
                <CreateRoundedIcon className="main-icon" onClick={() => navigate('/diary')}/>
            </div>
            <div className="main-background"></div>

            <div className="main-auth-nav">
                <div className="sign-up">
                    <span>Not a member yet ?</span>
                    <span className="sign-up-span" onClick={() => navigate('/signup')}>Sign up</span>
                </div>
                <div className="sign-in">
                    <span>Already have an account ?</span>
                    <span className="sign-in-span" onClick={() => navigate('/signin')}>Sign in</span>
                </div>
            </div>
            
        </div>
    )
}
export default Main;