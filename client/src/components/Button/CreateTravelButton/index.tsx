import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTravelButton.scss";
const CreateTravelButton = () => {
    const navigate = useNavigate();
    return (
        <button className="create-travel-button-wrapper" onClick={() => navigate('/travel/story/create')}>
            여행 스토리 추가하기
        </button>
    )
}

export default CreateTravelButton;