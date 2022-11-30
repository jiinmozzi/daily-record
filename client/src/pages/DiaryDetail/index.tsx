import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DiaryCalendar from "../../components/Calendar/DiaryCalendar";
import "./DiaryDetail.scss";
import { DiaryType, UserType } from "../../types";
import { useRecoilState } from "recoil";
import { userState } from "../../store/atom";

const DiaryDetail = () => {
    const location = useLocation();
    const [diary, setDiary] = useState<DiaryType>();
    const [user, setUser] = useRecoilState<UserType>(userState);
    useEffect(() => {
        setDiary(location.state);
    }, [location])
    return (
        <div className="diary-detail-wrapper">
            <DiaryCalendar />
            { diary && 
            <div className="diary-detail-content-wrapper">
                <div id="diary-detail-emoji">{diary.emoji}</div>
                <div id="diary-detail-date">{diary.date.toString().split('T')[0]}</div>
                <div id="diary-detail-title">{diary.title}</div>
                <div id="diary-detail-content">{diary.content}</div>
                <div id="diary-detail-username">{user.name}</div>
                <button id="diary-update-btn">수정하기</button>
            </div>
            }
        </div>
    )
    
}

export default DiaryDetail;