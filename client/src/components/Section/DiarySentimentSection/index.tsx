import {useState, useEffect} from "react";
import "./DiarySentimentSection.scss";

const DiarySentimentSection = () => {
    return (
        <div className="diary-sentiment-section-wrapper">
            <div id="create-sentiment-section">
                <div id="create-sentiment-box">EMOJI 관리</div>
            </div>
            <div id="sentiment-accumulative-histories">
                <span id="diary-total-count-text">지금까지 총 {}번의 일기를 적었습니다.</span>
                
            </div>
        </div>
    )
}

export default DiarySentimentSection;