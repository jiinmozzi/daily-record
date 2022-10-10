import {useState, useEffect} from "react";
import axios from "axios";

// import PacmanLoader from "react-spinners/PacmanLoader";
import Loading from "../../components/Loading";
import Calendar from "../../components/Calendar";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
import { useRecoilState } from "recoil";
import { sidState, userState } from "../../store/atom";
import { UserType } from "../../types";

const Home = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [init, setInit] = useState<boolean>(false);
    const [sid, setSid] = useRecoilState<string>(sidState);
    const [user, setUser] = useRecoilState<UserType>(userState);
    
    useEffect(()=> {
        setLoading(true);
        const fetchServer : any = async() => {
            const datas = await axios.get('http://localhost:3002');
        }
        fetchServer();
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
        <div className="home-wrapper">
           <Calendar />
        </div>
    )
}
export default Home;