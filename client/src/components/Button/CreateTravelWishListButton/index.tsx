import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTravelWishListButton.scss";

const CreateTravelWishListButton = () => {
    const navigate = useNavigate();
    return (
        <button className="create-travel-wishlist-button-wrapper" onClick={() => navigate('/travel/wish/create')}>
            위시 스토리 추가하기
        </button>
    )
}

export default CreateTravelWishListButton;