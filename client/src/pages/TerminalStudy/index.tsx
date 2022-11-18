import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import getUserProgrammingStudies from "../../api/getUserProgrammingStudies";
import TerminalNavigation from "../../components/Navigation/TerminalNavigation";
import TerminalMainSection from "../../components/Section/TerminalMainSection";
import { accessTokenState } from "../../store/atom";

import "./TerminalStudy.scss";

const TerminalStudy = () => {
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    useEffect(() => {
        if (accessToken){
            const fetchStudies = async() => {
                return await getUserProgrammingStudies(accessToken);
            }
            fetchStudies().then(res => console.log(res));
        }
    }, [])
    return (
        <div className="terminal-study-wrapper">
            <TerminalMainSection />
            <TerminalNavigation />
        </div>
    )
}

export default TerminalStudy;