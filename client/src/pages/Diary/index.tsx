import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"

import DiaryCalendar from "../../components/Calendar/DiaryCalendar";
import DiarySection from "../../components/Section/DiarySection";
import DiaryNavigation from "../../components/Navigation/DiaryNavigation";

import "./Diary.scss";
import DiarySentimentSection from "../../components/Section/DiarySentimentSection";

const Diary = () => {
    return (
        <>
            <div className="diary-wrapper">
                <DiarySection />
                <DiaryNavigation />
                <DiaryCalendar />
                <DiarySentimentSection />
            </div>
            
        </>
    )
}

export default Diary;