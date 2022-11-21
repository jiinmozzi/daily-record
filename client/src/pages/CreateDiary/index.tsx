import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import DiaryNavigation from "../../components/Navigation/DiaryNavigation";
import DiarySection from "../../components/Section/DiarySection";

import "./CreateDiary.scss";

const CreateDiary = () => {
    return (
        <div className="create-diary-wrapper">
            <DiarySection />
            <DiaryNavigation />
        </div>
    )
}

export default CreateDiary;