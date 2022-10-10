import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MailRoundedIcon from '@mui/icons-material/MailRounded';

import WorldClock from "../WorldClock";
import github from "../../assets/github.png";
import "./Footer.scss";

const Footer = () => {
    const navigate = useNavigate();
    const [showDetail, setShowDetail] = useState<boolean>(false);
    // const [time, setTime] = useState<number>(-1);
    
    // useEffect(() => {
    //     const now = new Date();
    //     const hour = now.getHours();
    //     const min = now.getMinutes();
    //     const sec = now.getSeconds();
    //     setTime(hour * 3600 + min * 60 + sec);
    // }, [])

    return (
        <div className="footer-wrapper">
            { showDetail && 
            <div className="detail">
                <div className="world-clock detail-content">
                    <WorldClock location={"Porto"} timeDiff={-8 * 3600}/>
                    <WorldClock location={"Lahahk"} timeDiff={-8 * 3600 -30 * 60}/>
                    <WorldClock location={"Ulaanbaatar"} timeDiff={-3600}/>
                    <WorldClock location={"Hochimin"} timeDiff={-2 * 3600}/>
                    <WorldClock location={"Munich"} timeDiff={-7 * 3600}/>
                    <WorldClock location={"Seattle"} timeDiff={-16 * 3600}/>
                    
                </div>
                <div className="navigations detail-content">
                    <div className="navs" onClick={() => navigate('/')}>Main</div>
                    <div className="navs" onClick={() => navigate('/home')}>Calendar</div>
                    <div className="navs" onClick={() => navigate('/travel')}>Travel</div>
                    <div className="navs" onClick={() => navigate('/terminal')}>Terminal</div>
                    <div className="navs" onClick={() => navigate('/asset')}>Asset</div>
                    <div className="navs" onClick={() => navigate('/fitness')}>Fitness</div>
                    <div className="navs" onClick={() => navigate('/book')}>Book</div>
                    <div className="navs" onClick={() => navigate('/diary')}>Diary</div>
                    <div className="navs" onClick={() => navigate('/bucketlist')}>BucketLists</div>
                    <div className="navs" onClick={() => navigate('/bucketlist')}>Search</div>
                </div>
                <div className="project-name detail-content">
                    <div className="project-name-upper">
                        <span className="project-title">Daily record</span>
                        <span className="project-subtitle">stay young</span>
                    </div>
                    
                    <div className="project-contact">
                        <span className="project-github">
                            <img src={github} alt="github" style={{width : "20px"}}/>
                            &nbsp;&nbsp;  https://github.com/jiinmozzi
                        </span>
                        <span className="project-developer">
                            <MailRoundedIcon />
                            &nbsp;&nbsp;jho378@naver.com
                        </span>
                    </div>
                    
                    
                    {/* <div className="arrow-down-div"> */}
                        <KeyboardArrowDownIcon className="arrow-down" onClick={() => setShowDetail(false)}/>
                    {/* </div>         */}
                </div>
            </div>        
            }
            { !showDetail && (
            <div className="short">
                <KeyboardArrowUpIcon className="arrow-up" onClick={() => {setShowDetail(true)}}/>
            </div>
            )
            }
        </div>
    )
}

export default Footer