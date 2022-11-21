import React, {useRef, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import "./WeeklyTimerCreateModal.scss";

type WeeklyTimerCreateModalPropsType = {
    setShowModal : (bool : boolean) => void
}

const WeeklyTimerCreateModal = ({setShowModal} : WeeklyTimerCreateModalPropsType) => {
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    const [activatedDay, setActivatedDay] = useState<string>("월");
    useEffect(() => {}, [])

    return (
        <div className="weekly-timer-create-modal-wrapper">
            <div className="weekly-timer-create-modal-inner">
                <span id="weekly-timer-modal-title">타임라인 추가</span>
                <CloseRoundedIcon className="close-icon" onClick={() => setShowModal(false)}/>
                <div id="timer-title">
                    <div id="timer-title-text">제목</div>
                    <input id="timer-title-input" type="text" placeholder="타임라인 제목을 입력하세요.."/>
                </div>
                <div id="time-date">
                    <div id="time-text">요일/시간</div>
                    <div id="time-modal-days">
                        <div className="time-modal-days">
                            {days.map((e,idx) => {
                                return (
                                    <div onClick={() => setActivatedDay(e)} style={{ color : activatedDay=== e ? "#fff": "#a6a6a6", backgroundColor : activatedDay=== e ? "#8897a8": "#fff"}} className="time-modal-day">{e}</div>
                                )
                            })}
                        </div>
                        <div id="time-modal-select-section">
                            <select name="hello" id="hello"></select>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default WeeklyTimerCreateModal;