import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import DiarySection from "../../components/Section/DiarySection";
import DiaryCreateTemplate from "../../components/FormTemplate/DiaryCreateTemplate";
import "./CreateDiary.scss";

const CreateDiary = () => {
    useEffect(() => {
        const timer = setTimeout(() => window.scrollTo(0, 500), 100);
        // return clearTimeout(timer);
    }, [])
    return (
        <div className="create-diary-wrapper">
            <DiarySection />
            <DiaryCreateTemplate />
            
        </div>
    )
}

export default CreateDiary;