import {useState, useEffect} from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../store/atom";

import { userState } from "../../store/atom";
import { UserType } from "../../types";

import "./UserTravelHistory.scss"

const UserTravelHistory = () => {
    const [user, setUser] = useRecoilState<UserType>(userState);
    return (
        <div className="user-travel-history-wrapper">
            <span>{user.name ? `${user.name}님의 여행 기록` : null }</span>
        </div>
    )
}

export default UserTravelHistory