import {useState, useEffect} from "react";
import { useRef } from "react";
import ScheduleDetailCard from "../../Card/ScheduleDetailCard";
import "./ScheduleDetailModal.scss";

type ScheduleDetailModalPropsType = {
    detailModalShow : any,
    setDetailModalShow : any,
    schedules : any,
    setSchedules : any,
    target : any,
}

export type ScheduleType = {
    _id : string,    
    user : string,
    dateFrom : Date,
    dateTo : Date,
    title : string,
    content : string,
    createdAt : Date,
    isCompleted : boolean,
    isPublic : boolean,
}

const ScheduleDetailModal = ({detailModalShow, setDetailModalShow, schedules, setSchedules, target} : ScheduleDetailModalPropsType) => {
    const [currentSchedules, setCurrentSchedules] = useState<ScheduleType[]>([]);
    useEffect(() => {
        for (let i=0; i<schedules.length; i++){
            const year = new Date(schedules[i].dateFrom).getFullYear().toString();
            const month = new Date(schedules[i].dateFrom).getMonth().toString().padStart(2, '0');
            const date = new Date(schedules[i].dateFrom).getDate().toString().padStart(2, '0');
            
            if (year + month + date === target){
                setCurrentSchedules((prev) => [...prev, schedules[i]]);
            }
        }
    }, [])
    useEffect(() => {
        console.log(currentSchedules);
    }, [currentSchedules])

    const detailModalRef = useRef<HTMLDivElement>(null);
    const onClickOutsideModal = ({target} : any) => { 
        if (detailModalShow === "" && !detailModalRef.current?.contains(target)){
            setDetailModalShow("none");
        } 
    } 
    return (
        <div className="schedule-detail-modal-outer-wrapper" style={{display : detailModalShow}} onClick={onClickOutsideModal}>
            <div className="schedule-detail-modal-inner-wrapper" ref={detailModalRef}>
                <span className="schedule-detail-date-indicator">{target.substr(0, 4)}/{target.substr(4, 2)}/{target.substr(6, 2)} </span>
                {currentSchedules.map(e => <ScheduleDetailCard schedule={e} schedules={schedules} setSchedules={setSchedules}/>)}    
            </div>
        </div>
    )
}
export default ScheduleDetailModal;