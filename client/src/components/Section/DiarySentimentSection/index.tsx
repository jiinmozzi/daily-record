import {useState, useEffect} from "react";
import { useRef } from "react";
import EmojiModal from "../../Modal/EmojiModal";
import "./DiarySentimentSection.scss";

const DiarySentimentSection = ({diaries} : any) => {
    const [showEmojiModal, setShowEmojiModal] = useState<boolean>(false);
    const emojiManageRef = useRef<HTMLDivElement>(null);
    const [emojiRanks, setEmojiRanks] = useState<any[]>([]);
    useEffect(() => {
        const obj : any = {};
        diaries.forEach((e : any) => {
            if(obj[e.emoji]){
                obj[e.emoji] += 1;
            }   else {
                obj[e.emoji] = 1;
            }
        })
        const keys = Object.keys(obj);
        const arr : any = [];
        keys.forEach(e => arr.push([e, obj[e]]));
        arr.sort((a : any, b : any) => b[1] - a[1]);
        setEmojiRanks(arr)
    }, [diaries])

    return (
        <div className="diary-sentiment-section-wrapper">
            <div id="create-sentiment-section">
                <span id="diary-total-count-text">지금까지 총 {diaries.length}&nbsp;번의 일기를 적었습니다.</span>
                <div id="create-sentiment-box" ref={emojiManageRef} onClick={() => setShowEmojiModal(true)}>
                    EMOJI 관리
                    {showEmojiModal && <EmojiModal emojiManageRef={emojiManageRef} showEmojiModal={showEmojiModal} setShowEmojiModal={setShowEmojiModal}/>}
                </div>
                
            </div>
            <div id="sentiment-accumulative-histories">
                <div className="sentiment-container">
                    <div className="sentiment-drop">
                        <div className="sentiment-content">
                            <h2 id="first-sentiment">01</h2>
                            <span className="sentiment-rank-wrapper">
                                <span className="sentiment-rank-emoji">{emojiRanks[0] ? emojiRanks[0][0] : null}</span>
                                <span className="sentiment-rank-counts">총 {emojiRanks[0] ? emojiRanks[0][1] : null}회 기록되었습니다.</span>
                            </span>
                            <nav id="first-nav">일기 보기</nav>
                        </div>
                    </div>
                    <div className="sentiment-drop">
                        <div className="sentiment-content">
                            <h2 id="second-sentiment">02</h2>
                            <span className="sentiment-rank-wrapper">
                                <span className="sentiment-rank-emoji">{emojiRanks[1] ? emojiRanks[1][0] : null}</span>
                                <span className="sentiment-rank-counts">총 {emojiRanks[1] ? emojiRanks[1][1] : null}회 기록되었습니다.</span>
                            </span>
                            <nav id="second-nav">일기 보기</nav>
                        </div>
                    </div>
                    <div className="sentiment-drop">
                        <div className="sentiment-content">
                            <h2 id="third-sentiment">03</h2>
                            <span className="sentiment-rank-wrapper">
                                <span className="sentiment-rank-emoji">{emojiRanks[2] ? emojiRanks[2][0] : "-"}</span>
                                <span className="sentiment-rank-counts">총 {emojiRanks[2] ? emojiRanks[2][1] : 0}회 기록되었습니다.</span>
                            </span>
                            <nav id="third-nav">일기 보기</nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiarySentimentSection;