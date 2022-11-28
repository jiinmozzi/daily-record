import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import InputRoundedIcon from '@mui/icons-material/InputRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import "./BucketlistCard.scss";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../store/atom";
import toggleBucketlist from "../../../api/toggleBucketlist";

type BucketlistCardPropsType = {
    title : string,
    createdAt : Date,
    comment : string,
    field : string,
    isCompleted : boolean,
    isPublic : boolean,
    imageUrl : string,
    isBucketlist : boolean,
    _id : string,
}
const BucketlistCard = ({isBucketlist, title, createdAt, comment, field, isCompleted, isPublic, imageUrl, _id} : BucketlistCardPropsType) => {
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const toggleIsDone = async() => {
        const res = await toggleBucketlist(accessToken, {isBucketlist, _id});
        
    }
    return (
        <div className="bucketlist-card-wrapper">
            <div id="bucketlist-image-wrapper">
                <img id="bucketlist-image" src={imageUrl} alt="img" />
            </div>
            <div id="bucketlist-content-wrapper">
                <div id="bucketlist-field">
                    <span>{field}</span>
                    <div>{createdAt.toString().slice(0, createdAt.toString().indexOf('T'))}</div>
                </div>
                <div id="bucketlist-title">{title}</div>
            </div>

            <div id="bucketlist-controller">
                <div id="bucketlist-done-controller" onClick={toggleIsDone} >
                    <CheckRoundedIcon className="bucketlist-card-icons" id="bucketlist-check-done" style={{ color : isCompleted ? "rgb(6, 196, 182)" : "rgb(153,154,148)" }}/>
                    <span style={{ fontWeight : isCompleted ? "bold" : "null", color : isCompleted ? "rgb(6,196,182)" : "rgb(153,154,148)" }}>{isCompleted ? "완료됨" : "완료하기"}</span>
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