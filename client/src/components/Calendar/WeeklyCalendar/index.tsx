import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import WeeklyTimerCreateModal from "../../Modal/WeeklyTimerCreateModal";

import "./WeeklyCalendar.scss";

const WeeklyCalendar = () => {
    const times = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    const [showModal, setShowModal] = useState<boolean>(false);
    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    const showCreateModal = (e : React.MouseEvent) => {
        setShowModal(true);
    }
    return (
        <div className="weekly-calendar-wrapper">
            {showModal && <WeeklyTimerCreateModal setShowModal={setShowModal}/>}
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
                {days.map(e => {
                    return (
                    <div className="time-stamp">
                        {times.map(e => {
                            return <div className="time-grid"></div>
                        })}
                    </div>
                    )
                })}
                
                
            </div>
        </div>
    )
}

export default WeeklyCalendar;