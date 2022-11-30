import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import getUserProgrammingPortfolio from "../../api/getUserProgrammingPortfolio";
import TerminalNavigation from "../../components/Navigation/TerminalNavigation";

import TerminalMainSection from "../../components/Section/TerminalMainSection";
import TerminalCollectionCard from "../../components/Card/TerminalCollectionCard";

import BlurOnIcon from '@mui/icons-material/BlurOn';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { accessTokenState } from "../../store/atom";

import "./TerminalCollection.scss"

const TerminalCollection = () => {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [completed, setCompleted] = useState<any[]>([]);
    const [notYet, setNotYet] = useState<any[]>([]);
    const [ongoing, setOngoing] = useState<any[]>([]);
    useEffect(() => {
        if (accessToken){
            const fetchPortfolios = async() => {
                return await getUserProgrammingPortfolio(accessToken);
            }
            fetchPortfolios().then(res => {
                console.log(res);
                if (res.message === "OK"){
                    setCompleted(res.data.filter((e:any) => e.onProcess === "completed"));
                    setNotYet(res.data.filter((e:any) => e.onProcess === "notyet"));
                    setOngoing(res.data.filter((e:any) => e.onProcess === "ongoing"));
                }
                
            });

        }
    }, [accessToken])
    return (
        <div className="terminal-collection-wrapper">
            <TerminalMainSection />
            <TerminalNavigation />
            <div id="terminal-collections">
                <div className="collection-not-yet collection-box">
                    <div className="collection-box-header">
                        <BlurOnIcon style={{ color : "rgb(145,145,141)"}}/>
                        <span className="collection-box-title" id="collection-not-yet">시작 전</span>
                    </div>
                    {notYet.map(e => <TerminalCollectionCard/>)}
                    <span className="create-collection-navs" id="create-not-you" onClick={() => navigate('/terminal/create/collection')}>+ 새로 만들기</span>
                </div>
                <div className="collection-on-process collection-box">
                    <div className="collection-box-header">
                        <PlayCircleOutlineIcon style={{ color : "rgb(99,155,191)" }}/>
                        <span className="collection-box-title" id="collection-process">진행 중</span>
                    </div>
                    {ongoing.map(e => <TerminalCollectionCard/>)}
                    <span className="create-collection-navs" id="create-on-process" onClick={() => navigate('/terminal/create/collection')}>+ 새로 만들기</span>
                </div>
                <div className="collection-done collection-box">
                    <div className="collection-box-header">
                        <CheckCircleOutlineIcon style={{ color : "rgb(107,155,125)" }} />
                        <span className="collection-box-title" id="collection-done">완료</span>
                    </div>
                    {completed.map(e => <TerminalCollectionCard/>)}
                    <span className="create-collection-navs" id="create-done" onClick={() => navigate('/terminal/create/collection')}>+ 새로 만들기</span>
                </div>
            </div>
            

        </div>
    )
}

export default TerminalCollection;