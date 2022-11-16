import {useState, useEffect} from "react";

import airbnb from "../../../assets/airbnb.png";
import apple from "../../../assets/apple.png";
import costco from "../../../assets/costco.png";
import ethereum from "../../../assets/ethereum.png";
import google from "../../../assets/google.png";
import starbucks from "../../../assets/starbucks.png";
import tesla from "../../../assets/tesla.png";
import cocacola from "../../../assets/cocacola.png";
import "./AssetMbtiSection.scss";

const AssetMbtiSection = () => {
    return (
        <div className="asset-mbti-section-wrapper">
            <div className="text-content">
                <div className="text-question">나는 어떤 투자자일까?</div>
                <div className="text-mbti">투자자 MBTI</div>
                <div className="text-span">주식 투자자라면 꼭 해야 할 테스트</div>
                <div className="text-span">자신의 투자 성향을 알아보세요!</div>
                <button className="mbti-button">테스트 하러가기</button>
            </div>
            <div className="image-content">
                <img src={apple} className="apple-logo company-logo" alt="apple" />
                <img src={ethereum} className="ethereum-logo company-logo" alt="ethereum" />    
                <img src={google} className="google-logo company-logo" alt="google" />    
                <img src={starbucks} className="starbucks-logo company-logo" alt="starbucks" />    
                <img src={tesla} className="tesla-logo company-logo" alt="tesla" />    
                <img src={costco} className="costco-logo company-logo" alt="costco" />
                <img src={airbnb} className="airbnb-logo company-logo" alt="airbnb" />
                <img src={cocacola} className="cocacola-logo company-logo" alt="cocacola" />
            </div>
        </div>
    )
}

export default AssetMbtiSection;