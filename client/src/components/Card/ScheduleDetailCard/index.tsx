import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import React, { useEffect } from 'react';

import completeSchedule from '../../../api/completeSchedule';
import "./ScheduleDetailCard.scss";
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../../../store/atom';
import deleteSchedule from '../../../api/deleteSchedule';
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

const ScheduleDetailCard = ({schedule, schedules, setSchedules} : any) => {
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const onClickDone = async( e : React.MouseEvent ) => {
        completeSchedule(accessToken, schedule._id);
        setSchedules((prev : ScheduleType[]) => [...prev.filter(e => e._id !== schedule._id), {...schedule, isCompleted : !schedule.isCompleted}]);
    }
    const onClickEdit = ( e : React.MouseEvent ) => {}
    const onClickDelete = async( e : React.MouseEvent ) => {
        await deleteSchedule(accessToken, schedule._id);
        
    }
    return (
        <div className="schedule-detail-card-wrapper">
            
                <div className="schedule-detail-date schedule-detail-item" >
                    <span>From : {new Date(schedule.dateFrom).toLocaleDateString('en-ko')}</span>
                    <span>To : {new Date(schedule.dateTo).toLocaleDateString('en-ko')} </span>
                </div>
                <div className="schedule-detail-main schedule-detail-item">
                    <span className="schedule-detail-title">title : {schedule.title}</span>
                    <span>content : {schedule.content }</span>
                </div>
                <div className="schedule-detail-nav schedule-detail-item">
                    <div className="schedule-icon-wrapper" onClick={onClickDone}>
                        <DoneRoundedIcon className="icon-done schedule-detail-icon"/>
                        <span>완료</span>
                    </div>
                    <div className="schedule-icon-wrapper" onClick={onClickEdit}>
                        <EditRoundedIcon className="icon-edit schedule-detail-icon"/>
                        <span>수정</span>
                    </div>
                    <div className="schedule-icon-wrapper" onClick={onClickDelete}>
                        <DeleteRoundedIcon className="icon-delete schedule-detail-icon"/>
                        <span>삭제</span>
                    </div>
                
            </div>
        </div>
    )
}

export default ScheduleDetailCard;