import { useNavigate } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';

import "./Navigation.scss";

const Navigation = () => {
    const navigate = useNavigate();
    return (
        <div className="nav">
            <>
                <div className="icon-wrapper">
                    <HomeRoundedIcon className="main-icon" onClick={() => navigate('/home')}/>
                    <span className="icon-span">Home</span>
                </div>
                <div className="icon-wrapper">
                    <CalendarMonthRoundedIcon className="main-icon" onClick={() => navigate('/home')}/>
                    <span className="icon-span">Calendar</span>
                </div>
                <div className="icon-wrapper">
                    <FlightTakeoffRoundedIcon className="main-icon" onClick={() => navigate('/travel')}/>
                    <span className="icon-span">Travel</span>
                </div>
                <div className="icon-wrapper">
                    <TerminalRoundedIcon className="main-icon" onClick={() => navigate('/terminal')}/>
                    <span className="icon-span">Terminal</span>
                </div>
                <div className="icon-wrapper">
                    <LocalAtmRoundedIcon className="main-icon" onClick={() => navigate('/terminal')}/>
                    <span className="icon-span">Asset</span>
                </div>
                <div className="icon-wrapper">
                    <FitnessCenterRoundedIcon className="main-icon" onClick={() => navigate('/fitness')}/>
                    <span className="icon-span">Fitness</span>
                </div>
                <div className="icon-wrapper">
                    <AutoStoriesRoundedIcon className="main-icon" onClick={() => navigate('/book')}/>
                    <span className="icon-span">Book</span>
                </div>
                <div className="icon-wrapper">
                    <CreateRoundedIcon className="main-icon" onClick={() => navigate('/diary')}/>
                    <span className="icon-span">Diary</span>
                </div>
                <div className="icon-wrapper">
                    <FlagRoundedIcon className="main-icon" onClick={() => navigate('/bucketlist')}/>
                    <span className="icon-span">Bucketlist</span>
                </div>
                <div className="icon-wrapper">
                    <SearchRoundedIcon className="main-icon" onClick={() => navigate('/')}/>
                    <span className="icon-span">Search</span>
                </div>            
            </>
        </div>
    )
}

export default Navigation