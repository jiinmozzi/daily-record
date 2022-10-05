import {useState, useEffect} from "react";
import renderCalendar from "../../utils/renderCalender";
const Calendar = () => {
    useEffect(() => {
        const datesArray = renderCalendar();
        console.log(datesArray);
    }, [])    
    return (
        <div>Calendar</div>
    )
}

export default Calendar;