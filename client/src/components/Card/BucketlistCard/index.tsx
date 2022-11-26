import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import InputRoundedIcon from '@mui/icons-material/InputRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import "./BucketlistCard.scss";
const BucketlistCard = () => {
    const [isDone, setIsDone] = useState<boolean>(false);
    return (
        <div className="bucketlist-card-wrapper">
            <div id="bucketlist-image-wrapper"></div>
            <div id="bucketlist-content-wrapper">
                <div id="bucketlist-field">
                    <span>Life Style</span>
                    <div>2022.11.14</div>
                </div>
                <div id="bucketlist-title">this is title</div>
            </div>

            <div id="bucketlist-controller">
                <div id="bucketlist-done-controller" onClick={() => setIsDone((prev) => !prev)} >
                    <CheckRoundedIcon className="bucketlist-card-icons" id="bucketlist-check-done" style={{ color : isDone ? "rgb(6, 196, 182)" : "rgb(153,154,148)" }}/>
                    <span style={{ fontWeight : isDone ? "bold" : "null", color : isDone ? "rgb(6,196,182)" : "rgb(153,154,148)" }}>{isDone ? "완료됨" : "완료하기"}</span>
                </div>
                <div className="bucketlist-fix-icon-wrapper">
                    <InputRoundedIcon id="bucketlist-fix-icon" className="bucketlist-card-icons" />
                </div>
                <div className="bucketlist-delete-icon-wrapper">
                    <DeleteRoundedIcon id="bucketlist-fix-icon" className="bucketlist-card-icons"/>
                </div>                
            </div>
        </div>
    )
}

export default BucketlistCard;