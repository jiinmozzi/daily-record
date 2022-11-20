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
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    useEffect(() => {
        if (accessToken){
            const fetchPortfolios = async() => {
                return await getUserProgrammingPortfolio(accessToken);
            }
            fetchPortfolios().then(res => console.log(res));
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
                    <TerminalCollectionCard />
                    <span className="create-collection-navs" id="create-not-you">+ 새로 만들기</span>
                </div>
                <div className="collection-on-process collection-box">
                    <div className="collection-box-header">
                        <PlayCircleOutlineIcon style={{ color : "rgb(99,155,191)" }}/>
                        <span className="collection-box-title" id="collection-process">진행 중</span>
                    </div>
                    <TerminalCollectionCard />
                    <TerminalCollectionCard />
                    <span className="create-collection-navs" id="create-on-process">+ 새로 만들기</span>
                </div>
                <div className="collection-done collection-box">
                    <div className="collection-box-header">
                        <CheckCircleOutlineIcon style={{ color : "rgb(107,155,125)" }} />
                        <span className="collection-box-title" id="collection-done">완료</span>
                    </div>
                    <TerminalCollectionCard />
                    <span className="create-collection-navs" id="create-done">+ 새로 만들기</span>
                </div>
            </div>
            

        </div>
    )
}

export default TerminalCollection;