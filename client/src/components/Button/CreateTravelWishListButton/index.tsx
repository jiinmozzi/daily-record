import React, {useState, useEffect} from "react";
import "./CreateTravelWishListButton.scss";

const CreateTravelWishListButton = () => {
    const createTravelWishList = (e : React.MouseEvent) => {

    }
    return (
        <button className="create-travel-wishlist-button-wrapper" onClick={createTravelWishList}>
            위시 스토리 추가하기
        </button>
    )
}

export default CreateTravelWishListButton;