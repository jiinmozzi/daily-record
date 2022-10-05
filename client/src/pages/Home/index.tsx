import {useState, useEffect} from "react";
import axios from "axios";

import PacmanLoader from "react-spinners/PacmanLoader";
import Loading from "../../components/Loading/Loading";
import Calendar from "../../components/Calendar";
const Home = () => {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=> {
        setLoading(true);
        const fetchServer : any = async() => {
            const datas = await axios.get('http://localhost:3002');
            console.log(datas);
        }
        fetchServer();
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    }, [])
    return (
        loading ? <Loading /> : <Calendar />
        
    )
}
export default Home;