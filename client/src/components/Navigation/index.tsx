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
                <div className="icon-wrapper"  onClick={() => navigate('/')}>
                    <HomeRoundedIcon className="main-icon"/>
                    <span className="icon-span">Home</span>
                </div>
                <div className="icon-wrapper"  onClick={() => navigate('/planner')}>
                    <CalendarMonthRoundedIcon className="main-icon"/>
                    <span className="icon-span">Calendar</span>
                </div>
                <div className="icon-wrapper"  onClick={() => navigate('/travel')}>
                    <FlightTakeoffRoundedIcon className="main-icon"/>
                    <span className="icon-span">Travel</span>
                </div>
                <div className="icon-wrapper"  onClick={() => navigate('/terminal')}>
                    <TerminalRoundedIcon className="main-icon"/>
                    <span className="icon-span">Terminal</span>
                </div>
                <div className="icon-wrapper" onClick={() => navigate('/asset')}>
                    <LocalAtmRoundedIcon className="main-icon"/>
                    <span className="icon-span">Asset</span>
                </div>
                <div className="icon-wrapper" onClick={() => navigate('/fitness')}>
                    <FitnessCenterRoundedIcon className="main-icon"/>
                    <span className="icon-span">Fitness</span>
                </div>
                <div className="icon-wrapper" onClick={() => navigate('/book')}>
                    <AutoStoriesRoundedIcon className="main-icon"/>
                    <span className="icon-span">Book</span>
                </div>
                <div className="icon-wrapper" onClick={() => navigate('/diary')}>
                    <CreateRoundedIcon className="main-icon"/>
                    <span className="icon-span">Diary</span>
                </div>
                <div className="icon-wrapper" onClick={() => navigate('/bucketlist')}>
                    <FlagRoundedIcon className="main-icon"/>
                    <span className="icon-span">Bucketlist</span>
                </div>
                <div className="icon-wrapper" onClick={() => navigate('/')}>
                    <SearchRoundedIcon className="main-icon"/>
                    <span className="icon-span">Search</span>
                </div>            
            </>
        </div>
    )
}

export default Navigation