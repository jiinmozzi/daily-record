import {useState, useEffect} from "react";
import axios from "axios";

// import PacmanLoader from "react-spinners/PacmanLoader";
import Loading from "../../components/Loading";
import MainCalendar from "../../components/Calendar/MainCalendar";
import Header from "../../components/Header";
import { useRecoilState } from "recoil";
import { sidState, userState, accessTokenState } from "../../store/atom";
import { UserType } from "../../types";
import getSchedules from "../../api/getSchedules";

import "./Planner.scss";
const Planner = () => {
    // const [loading, setLoading] = useState<boolean>(false);
    const [init, setInit] = useState<boolean>(false);
    const [sid, setSid] = useRecoilState<string>(sidState);
    const [user, setUser] = useRecoilState<UserType>(userState);
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(()=> setIsLoading(false), 3000)
    }, [])
    
    return (
        // isLoading ? <Loading /> :  
        <div className="planner-wrapper">
           <MainCalendar />
        </div>
    )
}
export default Planner;