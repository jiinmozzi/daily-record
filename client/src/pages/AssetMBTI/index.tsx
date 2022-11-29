import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import "./AssetMBTI.scss";

import mbtiQuestion from "../../assets/mbtiQuestion.json";
import mbtiResult from "../../assets/mbtiResult.json";
const AssetMBTI = () => {
    const [answers, setAnswers] = useState<number[]>([0,0,0,0,0,0,0,0]);
    
    const navigate = useNavigate();
    // const submitMBTIQuestionnaire = (e : ) => {}
    return (
        <div className="asset-mbti-wrapper">
            <form id="mbti-questionnaire">
                <span id="mbti-questionnaire-title">투자 MBTI</span>
                <div id="mbti-progress-indicator">
                    <span id="mbti-progress-span">1 / 8</span>
                    <div id="mbti-progress-bar"></div>
                </div>
                <div id="mbti-question-number"></div>
                <div id="mbti-question"></div>
                <div id="mbti-answers-wrapper">
                    <div className="mbti-answer"></div>
                    <div className="mbti-answer"></div>
                    <div className="mbti-answer"></div>
                    <div className="mbti-answer"></div>
                </div>
            </form>
        </div>
    )
}

export default AssetMBTI;