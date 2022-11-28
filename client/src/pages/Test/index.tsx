import TravelCard from "../../components/Card/TravelCard";
import ScheduleCreateModal from "../../components/Modal/ScheduleCreateModal";
import FileButton from "../../components/FileButton";
import Loading from "../../components/Loading";
import BucketlistCard from "../../components/Card/BucketlistCard";
import axios from "axios";
import {useState, useEffect } from "react";
const Test = () => {
    const [rate, setRate] = useState<number>(0);
    useEffect(() => {
        const fetchExchangeRate = async() => {
            return await axios.get("http://localhost:3002/test/rate");
        }
        fetchExchangeRate().then(res => console.log(res));
    })

    useEffect(() => {
        console.log("exchange rate is : ", rate) 
    }, [rate])
    return (
        <>
        {/* <ScheduleCreateModal /> */}
        {/* <TravelCard />
        <FileButton />
        <Loading /> */}s
        {/* <BucketlistCard /> */}
        {/* <FileButton /> */}
        </>
    )
}

export default Test;

