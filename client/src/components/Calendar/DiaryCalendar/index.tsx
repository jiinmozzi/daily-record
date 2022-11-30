import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { DiaryType } from "../../../types";
import renderCalendar from "../../../utils/renderCalender";

import "./DiaryCalendar.scss";
const DiaryCalendar = ({diaries} : any) => {
    const dayList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const [dates, setDates] = useState<number[]>([]);
    const [year, setYear] = useState<number>(0);
    const [month, setMonth] = useState<number>(0);
    const [date, setDate] =  useState<number>(0); 
    const [day, setDay] = useState<string>("");
    
    useEffect(() => {
        const dates = renderCalendar();
        setDates(dates.thisDates);

        const now = new Date();
        const year = now.getFullYear();
        const mth = now.getMonth();
        const date = now.getDate();
        const day = now.getDay();
        setYear(year);
        setMonth(mth + 1);
        setDate(date);
        setDay(dayList[day]);
    }, [])
    return (
        <div className="diary-calendar-wrapper">
            <div className="today">
                <span>{month} / {date}</span>
                <span className="today-day">{day}</span>
            </div>
            <div className="diary-dates">
            {   dates.map((e, idx) => {
                return new Date().getMonth() === month-1 && new Date().getDate() === e ? (
                    <div className="diary-emoji-summary-wrapper">
                        <div className="diary-date-indicator highlight">
                            {e}
                        </div>
                        <div className="diary-recorded-emoji">{diaries.find((e : DiaryType) => new Date(e.date).getFullYear() === year && new Date(e.date).getMonth() === month - 1 && new Date(e.date).getDate() === idx+1)?.emoji }</div>
                    </div>
                ) : 
                <div className="diary-emoji-summary-wrapper">
                    <div className="diary-date-indicator" style={{ color : 
                        new Date(year, month-1, e).getDay() === 0 ? "red" :
                        new Date(year, month-1, e).getDay() === 6 ? "#368dd2"
                        : "black" }}>{e}
                    </div>
                    <div className="diary-recorded-emoji">{diaries.find((e : DiaryType) => new Date(e.date).getFullYear() === year && new Date(e.date).getMonth() === month - 1 && new Date(e.date).getDate() === idx+1)?.emoji }</div>
                </div>
            })
            }
            </div>
        </div>
    )
}
export default DiaryCalendar;