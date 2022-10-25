import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"
import DiaryCalendar from "../../components/Calendar/DiaryCalendar";
import "./Diary.scss";

const Diary = () => {
    return (
        <>
            <div className="diary-wrapper">
                <span className="diary-span">jino's calendar</span>
                <DiaryCalendar />
                Diary
            </div>
            
        </>
    )
}

export default Diary;