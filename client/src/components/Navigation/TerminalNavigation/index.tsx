import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./TerminalNavigation.scss";

const TerminalNavigation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<string>('');
    
    useEffect(() => {
        if (location && location.pathname){
            setCurrentPage(location.pathname.split('/')?.[2]);
        }
    }, [])
    
    return (
        <div className="terminal-navigation-wrapper">
            <div className="terminal-navigation-navs" onClick={() => navigate('/terminal/collection')} style={{ textDecoration : currentPage==="collection" ? "underline" : "none", textUnderlinePosition : currentPage === "collection" ? "under" : "none", color : currentPage === "collection" ? "black" : "gray"}}>작업물 컬렉션</div>
            <div className="terminal-navigation-navs" onClick={() => navigate('/terminal/study')} style={{ textDecoration : currentPage==="study" ? "underline" : "none", textUnderlinePosition : currentPage === "study" ? "under" : "none", color : currentPage === "study" ? "black" : "gray"}}>개발 스터디</div>
            <div className="terminal-navigation-navs" onClick={() => navigate('/terminal/daily')} style={{ textDecoration : currentPage==="daily" ? "underline" : "none", textUnderlinePosition : currentPage === "daily" ? "under" : "none", color : currentPage === "daily" ? "black" : "gray"}}>데일리</div>
        </div>
    )
}


export default TerminalNavigation;