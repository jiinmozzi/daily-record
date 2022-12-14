import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./TerminalNavSection.scss";

const TerminalNavSection = () => {
    const navigate = useNavigate();
    return (
        <div className="terminal-nav-section-wrapper">
            <div id="terminal-nav-introduction">
                <span id="terminal-nav-introduction-text">당신의 개발 기록을 "<span style={{color : "rgb(255,165,86)"}}>한 공간</span>"에</span>
                <div id="terminal-main-button" onClick={() => navigate('/terminal/collection')}>내 작업물 보러가기</div>
            </div>
            <div id="terminal-navigations">
                <div className="terminal-nav-card" onClick={() => navigate('/terminal/collection')}>
                    <div className="terminal-nav-summary">작업물 컬렉션</div>
                    <div className="terminal-nav-description">당신이 진행한 프로젝트들을 보관하세요.</div>
                    
                </div>
                <div className="terminal-nav-card" onClick={() => navigate('/terminal/study')}>
                    <div className="terminal-nav-summary">개발 스터디</div>
                    <div className="terminal-nav-description">당신의 스터디 내역을 저장하세요.</div>
                </div>
                <div className="terminal-nav-card" onClick={() => navigate('/terminal/daily')}>
                    <div className="terminal-nav-summary" >데일리</div>
                    <div className="terminal-nav-description">당신의 일상 코딩을 기록하세요.</div>
                </div>
            </div>
        </div>
    )
}

export default TerminalNavSection;