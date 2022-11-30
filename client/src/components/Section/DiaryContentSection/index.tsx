import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/atom";
import { UserType } from "../../../types";

import "./DiaryContentSection.scss";

type DiaryType = {
    date : Date,
    title : string,
    content : string,
    emoji : string,
    createdAt : Date,
    isPublic : boolean
    _id : string,
}
type DiaryContentSectionPropsType = {
    diaries : DiaryType[],
}

const DiaryContentSection = ({diaries} : DiaryContentSectionPropsType) => {
    useEffect(() => {
        console.log(diaries);
    }, [])
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState<UserType>(userState);
    const [criterion, setCritierion] = useState<string>("date");
    return (
        <div className="diary-content-section-wrapper">
            <div className="diary-content-section-create-nav">
                <div id="diary-history-collection-name">{user.name}님의 하루들</div>
                <div id="create-diary-box" onClick={() => navigate('/diary/create')}>일기 쓰기</div>
            </div>
            <div className="diary-content-display-criterion">
                <div className="diary-content-criterion" id="date-based" style={{color : criterion === "date" ? "rgba(119,94,226, 0.7)" : "black"}} onClick={() => setCritierion('date')}>날짜 순 정렬</div>
                <div className="diary-content-criterion" id="emoji-based" style={{color : criterion === "emoji" ? "rgba(119,94,226, 0.7)" : "black"}} onClick={() => setCritierion('emoji')}>이모지 순 정렬</div>
            </div>
            <div className="diary-content-display-wrapper">
                <div className="diary-header-indicator">
                    <div className="diary-title">제목</div>
                    <div className="diary-content">내용</div>
                    <div className="diary-created-at">일자</div>
                </div>
                { diaries.length === 0 ? <div id="diaries-empty-text">기록된 일기가 없습니다. &nbsp;&nbsp;&nbsp;<span id="empty-create-diary-nav" onClick={() => navigate('/diary/create')} style={{ fontWeight : "bold", color : "rgb(119,94,226)"}}>추가하러 가기</span></div>
                :  diaries.map((diary : DiaryType) => 
                    <div className="diary-display" onClick={() => navigate(`/diary/${diary._id}`, {
                        state : diary
                    })}>
                        <div className="diary-title">{diary.title.length > 14 ? diary.title.slice(0, 14) + '...' : diary.title}</div>
                        <div className="diary-content">{diary.content.length > 40 ? diary.content.slice(0, 40) + "..." : diary.content}</div>
                        <div className="diary-created-at">{diary.date.toString().slice(0, diary.date.toString().indexOf('T'))}</div>
                    </div>
                )
                }
                
            </div>
        </div>
    )
}

export default DiaryContentSection;