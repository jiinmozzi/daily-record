import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"

import DiaryCalendar from "../../components/Calendar/DiaryCalendar";
import DiarySection from "../../components/Section/DiarySection";
import DiarySentimentSection from "../../components/Section/DiarySentimentSection";
import DiaryContentSection from "../../components/Section/DiaryContentSection";
import "./Diary.scss";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../store/atom";
import getDiaries from "../../api/getDiaries";

import { DiaryType } from "../../types";

const Diary = () => {
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [diaries, setDiaries] = useState<DiaryType[]>([]);
    useEffect(() => {
        if (accessToken){
            const fetchDiaries = async() => {
                return await getDiaries(accessToken);
            }
            fetchDiaries().then(res => setDiaries(res.data));
        }
    }, [accessToken])
    return (
        <>
            <div className="diary-wrapper">
                <DiarySection />
                <DiaryCalendar diaries={diaries}/>
                <DiarySentimentSection diaries={diaries}/>
                <DiaryContentSection diaries={diaries}/>
            </div>
            
        </>
    )
}

export default Diary;