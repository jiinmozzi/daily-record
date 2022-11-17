import {useState, useEffect} from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../store/atom";

import { userState } from "../../store/atom";
import { UserType } from "../../types";

import flag from "../../assets/flag.json";
import "./UserTravelHistory.scss"

type UsersTravelHistoryType = {
    visitedCountries : string[]
    wishListCountries : string[]
}
type UserTravelHistoryPropsType = {
    usersTravelHistory : UsersTravelHistoryType
}

const UserTravelHistory = ({usersTravelHistory} : UserTravelHistoryPropsType) => {
    const [user, setUser] = useRecoilState<UserType>(userState);
    const flags : {[key : string]: string} = {
        ...flag
    }

    return (
        <div className="user-travel-history-wrapper">
            <span id="username-travel-history-span">{user.name ? `${user.name}님의 여행 기록` : null }</span>
            {usersTravelHistory.visitedCountries.map((e:string) => flags[e])};
        </div>
    )
}

export default UserTravelHistory