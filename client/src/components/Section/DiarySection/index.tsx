import './DiarySection.scss';
import diaryMainPic from "../../../assets/diary-main.jpg";
const DiarySection = () => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
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
            <div id="diary-section-monthly-controller">
                <div id="diary-section-year">2022</div>
                {months.map(month => {
                    return <div className="diary-section-months">{month}</div>
                })}
                
                
            </div>
        </div>
    )
}

export default DiarySection;