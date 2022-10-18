import {useState, useEffect} from "react";
import axios from "axios";

// import PacmanLoader from "react-spinners/PacmanLoader";
import Loading from "../../components/Loading";
import Calendar from "../../components/Calendar";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
import { useRecoilState } from "recoil";
import { sidState, userState, accessTokenState } from "../../store/atom";
import { UserType } from "../../types";
import getSchedules from "../../api/getSchedules";

import "./Planner.scss";
const Planner = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [init, setInit] = useState<boolean>(false);
    const [sid, setSid] = useRecoilState<string>(sidState);
    const [user, setUser] = useRecoilState<UserType>(userState);
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    useEffect(() => {
        if (accessToken){
            const _getSchedules = async () => {
                return await getSchedules(accessToken);
            }
            _getSchedules().then(res => console.log(res));
            
        }
    }, [accessToken])

    useEffect(()=> {
        setLoading(true);
        console.log('heelo')
        setTimeout(() => {
            setLoading(false);
            setInit(true);
        }, 3000)
    }, [])

    // useEffect(() => {
    //     let cookie : string = document.cookie;
    //     cookie = cookie.slice(cookie.indexOf('=') + 1);
    //     setSid(cookie);
    //   }, [])    
    // useEffect(() => {
    // console.log(sid);
    // }, [sid]);
    return (
        <div className="planner-wrapper">
           <Calendar />
        </div>
    )
}
export default Planner;