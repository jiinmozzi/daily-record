import PacmanLoader from "react-spinners/PacmanLoader";
import { useEffect } from "react";
import "./Loading.scss";
const Loading = () => {
    useEffect(() => {
        console.log("loading entered")
    }, [])
    
    return (
        <PacmanLoader className="spinner"/>
    )
}

export default Loading;