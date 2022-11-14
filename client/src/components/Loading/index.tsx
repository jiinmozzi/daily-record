import PacmanLoader from "react-spinners/PacmanLoader";
import { useEffect } from "react";
import "./Loading.scss";
const Loading = () => {
    useEffect(() => {
        console.log("loading entered")
    }, [])
    
    return (
        <div className="spinner-wrapper">
            <PacmanLoader color="#6b5ce7" className="spinner"/>
            <span className="loading-text">Loading...</span>
        </div>
    )
}

export default Loading;