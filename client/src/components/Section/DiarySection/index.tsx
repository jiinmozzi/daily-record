import './DiarySection.scss';
import diaryMainPic from "../../../assets/diary-main.jpg";
const DiarySection = () => {
    return (
        <div className='diary-section-wrapper'>
            <img id="diary-main-pic" src={diaryMainPic} alt="diary" />
            <div className="diary-section-text-wrapper">
                <span style={{fontWeight : "900", fontSize : "18px"}}>To make each day count</span>
                <br></br>
                <br></br>
                <span>Daily record</span>
                <span>Designed by jinmozzi</span>
            </div>
            
        </div>
    )
}

export default DiarySection;