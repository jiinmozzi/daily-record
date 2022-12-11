// import { relative } from "path";
import React, {useState, useEffect} from "react";
// import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import getWeeklySchedules from "../../../api/getWeeklySchedules";
import { accessTokenState } from "../../../store/atom";
import WeeklyTimerCreateModal from "../../Modal/WeeklyTimerCreateModal";

import "./WeeklyCalendar.scss";

type WeeklyScheduleType = {
    day : string,
    startTime : number,
    endTime : number,
    isPublic : boolean,
    title : string,
    _id : string,
}

const WeeklyCalendar = () => {
    
    const times = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    const [showModal, setShowModal] = useState<boolean>(false);
    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [weeklySchedules, setWeeklySchedules] = useState<WeeklyScheduleType[]>([]);
    const showCreateModal = (e : React.MouseEvent) => {
        setShowModal(true);
    }

    useEffect(() => {
        if (accessToken){
            const fetchSchedules = async() => {
                return await getWeeklySchedules(accessToken);
            }
            fetchSchedules().then(res => {
                setWeeklySchedules(res.data);
            });
            
        }
    }, [accessToken])

    return (
        <div className="weekly-calendar-wrapper">
            {showModal && <WeeklyTimerCreateModal setShowModal={setShowModal} weeklySchedules={weeklySchedules} setWeeklySchedules={setWeeklySchedules}/>}
            <div id="weekly-calendar-header">
                <span id="weekly-planner">Weekly planner</span>
                <div id="time-create-btn" onClick={showCreateModal}>타임라인 추가</div>
            </div>
            
            <div id="days">
                <div className="days" id="day-time">DAY/TIME</div>
                {days.map(e => {
                    return <div className="days">{e}</div>
                })}
            </div>
            <div id="time-stamps">
                <div id="time-indicator">
                    {times.map(e => {
                        return <div className="time-grid">{String(e).padStart(2, '0')}:00 ~ {String(e+1).padStart(2, '0')}:00</div>
                    })}
                </div>
                {days.map(day => {
                    return (
                    <div className="time-stamp">
                        {times.map(time => {
                            return (
                                <div className="time-grid">
                                    
                                    <>
                                    {weeklySchedules.filter((e : WeeklyScheduleType) => e.day === day).map(schedule => {
                                        return time <= schedule.startTime/100 && time + 1 > schedule.startTime/100 && 
                                        <div className="weekly-schedule-entity" style={{ top : schedule.startTime % 100 === 0 ? "0px" : "25px", height : `${(schedule.endTime - schedule.startTime) + 1}%`}}>{schedule.title}</div>
                                    })}
                                    </>
                                </div>
                                )
                        })}
                    </div>
                    )
                })}
                
                
            </div>
        </div>
    )
}

export default WeeklyCalendar;