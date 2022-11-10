import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"

import DiaryCalendar from "../../components/Calendar/DiaryCalendar";
import DiarySection from "../../components/Section/DiarySection";
import DiaryNavigation from "../../components/Navigation/DiaryNavigation";

import "./Diary.scss";

const Diary = () => {
    return (
        <>
            <div className="diary-wrapper">
                {/* <span className="diary-span">jino's calendar</span> */}
                <DiarySection />
                <DiaryNavigation />
                <DiaryCalendar />
                Diary
            </div>
            
        </>
    )
}

export default Diary;