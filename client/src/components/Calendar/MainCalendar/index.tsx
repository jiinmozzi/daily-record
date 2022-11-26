import React, {useState, useEffect} from "react";
import renderCalendar from "../../../utils/renderCalender";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import ScheduleCreateModal from "../../Modal/ScheduleCreateModal";
import ScheduleDetailModal from "../../Modal/ScheduleDetailModal";
import { accessTokenState } from "../../../store/atom";
import getSchedules from "../../../api/getSchedules";
import "./MainCalendar.scss";
import NoteAddRounded from "@mui/icons-material/NoteAddRounded";
import { useRecoilState } from "recoil";
import { ScheduleType } from "../../../types";
import Loading from "../../Loading";
const MainCalendar = () => {
    const navigate = useNavigate();
    const monthlyText : string[] = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const params = useParams();
    const [dates, setDates] = useState<number[]>([]);
    const [year, setYear] = useState<number>(0);
    const [month, setMonth] = useState<number>(0);
    const [monthText, setMonthText] = useState<string>("");
    const [prevDates, setPrevDates] = useState<number[]>([]);
    const [postDates, setPostDates] = useState<number[]>([]);
    const [currDates, setCurrDates] = useState<number[]>([]);
    const [modalShow, setModalShow] = useState<string>("none");
    const [detailModalShow, setDetailModalShow] = useState<string>("none");
    const [schedules, setSchedules] = useState<ScheduleType[]>([]);
    const [target, setTarget] = useState<string>("");
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);

    useEffect(() => {
        if (accessToken){
            const _getSchedules = async () => {
                return await getSchedules(accessToken);
            }
            _getSchedules().then(res => setSchedules(res.data));
        }
    }, [accessToken])
    
    // useEffect(() => {
    //     console.log(schedules);
    // }, [schedules])

    const onClickRight = (e : React.MouseEvent) => {
        if ( month === 11 ){
            setYear(year + 1);
            setMonth(0);
        }   else {
            setMonth((prev) => prev + 1);
        }
    }
    const onClickLeft = (e : React.MouseEvent) => {
        if (month === 0){
            setYear(year - 1);
            setMonth(11);
        }   else {
            setMonth((prev) => prev - 1); 
        }
    }
    const onClickPrevDate = ( e : React.MouseEvent ) => {
        const target = e.target as HTMLDivElement;
        const span = target.firstChild as HTMLSpanElement;
        setTarget(String(year) + String(month - 1).padStart(2, '0') + span.innerText.padStart(2, '0') )
        setDetailModalShow("");
    }

    const onClickCurrDate = ( e : React.MouseEvent ) => {
        const target = e.target as HTMLDivElement;
        const span = target.firstChild as HTMLSpanElement;
        setTarget(String(year) + String(month).padStart(2, '0') + span.innerText.padStart(2, '0') )    
        setDetailModalShow("");
    }
    const onClickPostDate = ( e : React.MouseEvent ) => {
        const target = e.target as HTMLDivElement;
        const span = target.firstChild as HTMLSpanElement;
        
        setTarget(String(year) + String(month + 1).padStart(2, '0') + span.innerText.padStart(2, '0') )
        setDetailModalShow("");
    }

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
            <div className="schedule-modal-conditional">
                <ScheduleCreateModal modalShow={modalShow} setModalShow={setModalShow} schedules={schedules} setSchedules={setSchedules}/>
                { detailModalShow !== "none" && <ScheduleDetailModal detailModalShow={detailModalShow} setDetailModalShow={setDetailModalShow} schedules={schedules} setSchedules={setSchedules} target={target}/> }
            </div>
            
            <div className="month-indicator">
                <div className="date-indicator">
                    <span className="month-text-span">
                        {year} {monthText}
                    </span>
                </div> 
                
                {monthlyText.map((mth, idx) => {
                    return (
                        <div className="month-nav-container" style={{ backgroundColor : monthlyText.indexOf(mth) === month ? "rgb(136,151,168)" :  "#fff", color : monthlyText.indexOf(mth) === month ? "#fff" : "rgb(136,151,168)"}} onClick={() => navigate(`/planner/${year}/${monthlyText.indexOf(mth) + 1}`)}>
                            <span className="month-nav">{mth}</span>
                        </div>
                    )}
                )}
                
            </div>
            <div className="calendar-container">
                <KeyboardArrowLeftRoundedIcon className="arrow" onClick={onClickLeft}/>
                <div className="calendar-wrapper">
                    <div className="create-icon-wrapper">
                        <NoteAddRoundedIcon className="create-icon" onClick={() => setModalShow("")}/>
                    </div>
                    <div className="day">Sunday</div>
                    <div className="day">Monday</div>
                    <div className="day">Tuesday</div>
                    <div className="day">Wednesday</div>
                    <div className="day">Thursday</div>
                    <div className="day">Friday</div>
                    <div className="day">Saturday</div>
                    { prevDates.map((date) => {
                            return (
                                <div className="date prev" onClick={onClickPrevDate}>
                                    <span className="date-text">{date}</span>
                                </div>
                            )}
                    )}
                    
                    { currDates.map((date) => {
                        return (
                        <div className="date curr" onClick={onClickCurrDate}>
                            <span className="date-text">{date}</span>
                            {schedules.map((e : ScheduleType) => { 
                                return ( 
                                    new Date(e.dateFrom).getMonth() === month 
                                    && new Date(e.dateFrom).getDate() === date 
                                    &&  <div className="schedule" style={{opacity : e.isCompleted ? 0.4 : 1}}>{e.title}</div>) 
                                })
                            }
                        </div>
                        )}
                    )} 

                    { postDates.map((date) => {
                        return (
                        <div className="date post" onClick={onClickPostDate}>
                            <span className="date-text">{date}</span>
                        </div>
                        )}
                    )}
                </div>
                <KeyboardArrowRightRoundedIcon className="arrow" onClick={onClickRight}/>
            </div>
        </>
    )
}

export default MainCalendar;