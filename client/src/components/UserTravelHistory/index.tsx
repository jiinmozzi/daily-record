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
    useEffect(() => {
        console.log(usersTravelHistory)
    }, [usersTravelHistory])
    const [user, setUser] = useRecoilState<UserType>(userState);
    const flags : {[key : string]: string} = {
        ...flag
    }

    return (
        <div className="user-travel-history-wrapper">
            <div className="username-travel-lists" id="username-travel-history">{user.name ? `${user.name}님이 다녀온 나라들` : null }</div>
            <div className="flags-image">
                {usersTravelHistory.visitedCountries.map((e:string) => {
                    return (
                        <div className="visited-countries-flags">{flags[e]}</div>
                    )
                })}
            </div>
            <div className="username-travel-lists" id="username-travel-wishlist">{user.name ? `${user.name}님의 관심 국가` : null }</div>
            <div className="flags-image">
                {usersTravelHistory.wishListCountries.map((e:string) => {
                    return (
                        <div className="wishlist-countries-flags">{flags[e]}</div>
                    )
                })}
            </div>

        </div>
    )
}

export default UserTravelHistory