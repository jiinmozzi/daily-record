import React, {useState, useEffect} from "react";
import { useRef } from "react";
import bucketlist1 from "../../../assets/bucketlist1.jpeg";
import bucketlist2 from "../../../assets/bucketlist2.jpeg";
import bucketlistmain from "../../../assets/bucketlistmain.jpg";
import bucketlist_main from "../../../assets/bucketlistmain.svg";
import testing from "../../../assets/testing.jpeg";
import "./BucketListSection.scss";

const BucketListSection = () => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const onClickBtn = (e : React.MouseEvent) => {
        e.preventDefault();
    }
    return (
        <div className="bucket-list-section-wrapper">
            <div id="bucket-list-text">
                <span id="bucketlist-first-text" className="bucketlist-text"><span className="bucket-text-emphasis">C</span>onnecting the dots</span>
                <span id="bucketlist-second-text" className="bucketlist-text"><span className="bucket-text-emphasis">E</span>xplore the life you want to live.</span>
                <div id="bucketlist-nav-card-container">
                    <div className="bucketlist-nav-card" style={{ transform : isHovered ? "scale(1.1)" : "", backgroundImage : `url(${testing})`}}>
                        <div id="bucketlist-nav-text"></div>
                        {/* <button id="bucketlist-nav-btn" onClick={onClickBtn} onMouseEnter={() => setIsHovered((prev) => true)} onMouseLeave={() => setIsHovered((prev) => false)}>버킷리스트 추가하기</button> */}
                    </div>
                </div>
                
            </div>
            {/* <img src={testing} alt="test" /> */}
            <img className="bucketlist-main-pic" src={bucketlist_main} alt="bucketlist" />

            
        </div>
    )
}
export default BucketListSection;