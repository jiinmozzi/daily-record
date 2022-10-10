import {useState, useEffect} from "react";
import "./WorldClock.scss";

type WorldClockParamsType = {
    location : string,
    // time : number,
    timeDiff : number,
}

const WorldClock = ({location,  timeDiff} : WorldClockParamsType) => {
    const [time, setTime] = useState<number>(-1);
    const [realTime, setRealTime] = useState<number>(-1);
    useEffect(() => {
        const now = new Date();
        const hour = now.getHours();
        const min = now.getMinutes();
        const sec = now.getSeconds();
        setTime(hour * 3600 + min * 60 + sec);
    }, [])
    useEffect(() => {
        let realTime;
        if (time !== -1){
            realTime = time + timeDiff;
            if (realTime < 0){
                realTime += 24 * 3600;
            }   
            if (realTime >= 24 * 3600){
                realTime -= 24 * 3600;
            }
            setRealTime(realTime);
        }
    }, [time, timeDiff])
    useEffect(() => {
        const timer = setInterval(() => {
            
            setRealTime((prev : number) => prev%(24*3600) + 1);
        }, 1000)
        return () => clearInterval(timer); 
    }, [realTime])
    return (
        <div className="world-clock-wrapper">
            <span className="location">{location}</span>
            <span className="time">{`
            ${String(Math.floor(realTime/3600)).padStart(2, '0')} : 
            ${String(Math.floor((realTime%3600)/60)).padStart(2, '0')} :
            ${String(Math.floor((realTime%3600)%60)).padStart(2, '0')}
            `}</span>
        </div>
    )
}
export default WorldClock;