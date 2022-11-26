import React, {useRef, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import "./WeeklyTimerCreateModal.scss";
import createWeeklySchedule from "../../../api/createWeeklySchedule";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../store/atom";
import getWeeklySchedules from "../../../api/getWeeklySchedules";

type WeeklyTimerCreateModalPropsType = {
    setShowModal : (bool : boolean) => void
}

type WeeklyScheduleFormType = {
    day : string,
    title : string,
    startTime : Number,
    endTime : Number,
    isPublic : boolean,
}

const WeeklyTimerCreateModal = ({setShowModal} : WeeklyTimerCreateModalPropsType) => {
    const hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    const minutes = [0, 30];
    const [day, setDay] = useState<string>("MON");
    const [startHour, setStartHour] = useState<number>(0);
    const [startMin, setStartMin] = useState<number>(0);
    const [endHour, setEndHour] = useState<number>(0);
    const [endMin, setEndMin] = useState<number>(0);
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    const daysForDB = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
    const [title, setTitle] = useState<string>("");
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const onSubmitWeekly = async( e : React.MouseEvent ) => {
        e.preventDefault();
        const startTime = startHour * 100 + startMin;
        const endTime = endHour * 100 + endMin;
        createWeeklySchedule(accessToken, {day, title, startTime, endTime, isPublic : true});
    }

    const onChangeTitle = ( e : React.ChangeEvent ) => {
        const target = e.target as HTMLInputElement;
        setTitle(target.value);
    }
    
    const onChangeSelect = ( e : React.ChangeEvent ) => {
        const target = e.target as HTMLSelectElement;
        const val = Number(target.value);
        switch(target.name){
            case "start-hour":
                setStartHour(val);
                break;
            case "start-min":
                setStartMin(val);
                break;
            case "end-hour":
                setEndHour(val);
                break;
            case "end-min":
                setEndMin(val);
                break;
            default:
                break;
        }
        
        
    }


    return (
        <div className="weekly-timer-create-modal-wrapper">
            <div className="weekly-timer-create-modal-inner">
                <span id="weekly-timer-modal-title">타임라인 추가</span>
                <CloseRoundedIcon className="close-icon" onClick={() => setShowModal(false)}/>
                <div id="timer-title">
                    <div id="timer-title-text">제목</div>
                    <input id="timer-title-input" type="text" onChange={onChangeTitle} placeholder="타임라인 제목을 입력하세요.."/>
                </div>
                <div id="time-date">
                    <div id="time-text">요일/시간</div>
                    <div id="time-modal-days">
                        <div className="time-modal-days">
                            {days.map((e,idx) => {
                                return (
                                    <div onClick={() => setDay(daysForDB[idx])} style={{ color : daysForDB.indexOf(day)=== idx ? "#fff": "#a6a6a6", backgroundColor :  daysForDB.indexOf(day)=== idx ? "#8897a8": "#fff"}} className="time-modal-day">{e}</div>
                                )
                            })}
                        </div>
                        <div id="time-modal-select-section">
                            <select className="selects" name="start-hour" id="start-hour" value={startHour} onChange={onChangeSelect}>
                                {hours.map(hour => {
                                    return (
                                        <option value={hour}>{ hour < 12 ? `오전 ${hour}시` : `오후 ${hour}시`}</option>
                                    )
                                })}
                            </select>
                            <select className="selects" name="start-min" id="start-min" value={startMin} onChange={onChangeSelect}>
                                {minutes.map(min => {
                                    return (
                                        <option value={min}>{min}분</option>
                                    )
                                })}
                            </select>
                            ~
                            <select className="selects" name="end-hour" id="end-hour" value={endHour} onChange={onChangeSelect}>
                                {hours.map(hour => {
                                    return (
                                        <option value={hour}>{ hour < 12 ? `오전 ${hour}시` : `오후 ${hour}시`}</option>
                                    )
                                })}
                            </select>
                            <select className="selects" name="end-min" id="end-min" value={endMin} onChange={onChangeSelect}>
                                {minutes.map(min => {
                                    return (
                                        <option value={min}>{min}분</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <button id="weekly-submit-btn" onClick={onSubmitWeekly}>저장</button>
            </div>
        </div>
    )
}

export default WeeklyTimerCreateModal;