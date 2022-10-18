import React, {useState, useEffect} from "react";
import renderCalendar from "../../utils/renderCalender";
import { useParams } from "react-router-dom";

import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import ScheduleCreateModal from "../Modal/ScheduleCreateModal";
import "./Calendar.scss";

const Calendar = () => {
    const monthlyText = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const params = useParams();
    const [dates, setDates] = useState<number[]>([]);
    const [year, setYear] = useState<number>(0);
    const [month, setMonth] = useState<number>(0);
    const [monthText, setMonthText] = useState<string>("");
    
    const [prevDates, setPrevDates] = useState<number[]>([]);
    const [postDates, setPostDates] = useState<number[]>([]);
    const [currDates, setCurrDates] = useState<number[]>([]);

    useEffect(() => {
        if ( params.year ){
            setYear(Number(params.year));
        }  else {
            setYear(new Date().getFullYear());
        }
        if ( params.month ) {
            setMonth(Number(params.month) - 1);
        }   else {
            setMonth(new Date().getMonth());
        }
    }, [params])

    useEffect(() => {
        const calendar = renderCalendar(year, month);
        setPrevDates(calendar.prevDates);
        setPostDates(calendar.nextDates);
        setCurrDates(calendar.thisDates);
        setDates(calendar.dates);
        setMonthText(monthlyText[month]);
        // setDates(datesArray);
    }, [year, month])    

    return (
        <>
            <div className="date-indicator">
                <span>
                    2022 {monthText}
                </span>
            </div> 
            <div className="calendar-container">
                <KeyboardArrowLeftRoundedIcon className="arrow"/>
                <div className="calendar-wrapper">
                    <div className="day">Sunday</div>
                    <div className="day">Monday</div>
                    <div className="day">Tuesday</div>
                    <div className="day">Wednesday</div>
                    <div className="day">Thursday</div>
                    <div className="day">Friday</div>
                    <div className="day">Saturday</div>
                    { prevDates.map((date) => {
                            return (
                                <div className="date prev">
                                    <span className="date-text">{date}</span>
                                </div>
                            )}
                    )}
                    
                    { currDates.map((date) => {
                        return (
                        <div className="date curr">
                            <span className="date-text">{date}</span>
                        </div>
                        )}
                    )} 

                    { postDates.map((date) => {
                        return (
                        <div className="date post">
                            <span className="date-text">{date}</span>
                        </div>
                        )}
                    )}
                </div>
                <KeyboardArrowRightRoundedIcon className="arrow"/>
            </div>
        </>
    )
}

export default Calendar;