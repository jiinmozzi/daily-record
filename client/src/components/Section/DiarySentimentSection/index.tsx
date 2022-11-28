import {useState, useEffect} from "react";
import EmojiModal from "../../Modal/EmojiModal";
import "./DiarySentimentSection.scss";

const DiarySentimentSection = ({diaries} : any) => {
    const [showEmojisModal, setShowEmojisModal] = useState<boolean>(false);
    return (
        <div className="diary-sentiment-section-wrapper">
            <div id="create-sentiment-section">
                <span id="diary-total-count-text">지금까지 총 {diaries.length}&nbsp;번의 일기를 적었습니다.</span>
                <div id="create-sentiment-box" onClick={() => setShowEmojisModal(true)}>
                    EMOJI 관리
                    {showEmojisModal && <EmojiModal />}
                </div>
                
            </div>
            <div id="sentiment-accumulative-histories">
                <div className="sentiment-container">
                    <div className="sentiment-drop">
                        <div className="sentiment-content">
                            <h2 id="first-sentiment">01</h2>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quia laudantium ex quam et obcaecati aperiam exercitationem asperiores illo ut? Ipsum distinctio nobis aut hic doloremque rem autem eius error?</span>
                            <nav id="first-nav">일기 보기</nav>
                        </div>
                    </div>
                    <div className="sentiment-drop">
                        <div className="sentiment-content">
                            <h2 id="second-sentiment">02</h2>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quia laudantium ex quam et obcaecati aperiam exercitationem asperiores illo ut? Ipsum distinctio nobis aut hic doloremque rem autem eius error?</span>
                            <nav id="second-nav">일기 보기</nav>
                        </div>
                    </div>
                    <div className="sentiment-drop">
                        <div className="sentiment-content">
                            <h2 id="third-sentiment">03</h2>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quia laudantium ex quam et obcaecati aperiam exercitationem asperiores illo ut? Ipsum distinctio nobis aut hic doloremque rem autem eius error?</span>
                            <nav id="third-nav">일기 보기</nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiarySentimentSection;