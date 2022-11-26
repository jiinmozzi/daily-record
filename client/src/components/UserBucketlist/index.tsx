import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import getBucketlists from "../../api/getBucketlists";

import BucketlistCard from "../Card/BucketlistCard";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useRecoilState } from "recoil";
import { UserType } from "../../types";
import { accessTokenState, userState } from "../../store/atom";

import "./UserBucketlist.scss";
import BucketlistCreateModal from "../Modal/BucketlistCreateModal";


const UserBucketlist = () => {
    const [user, setUser] = useRecoilState<UserType>(userState);
    const [fraction, setFraction] = useState<string>("entire"); 
    const [criterion, setCriterion] = useState<string>("process");
    const [isBucketlistShow, setIsBucketlistShow] = useState<boolean>(true);
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [bucketlists, setBucketlists] = useState<any[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const onClickImage = (e : React.MouseEvent) => {

    }

    const onToggleCriterion = (e : React.MouseEvent) => {
        if (criterion === "process"){
            setCriterion("classification");
            return;
        }   else {
            setCriterion("process");
            return;
        }
    }
    const onToggleDisplayType = (e : React.MouseEvent) => {
        if (isBucketlistShow){
            setIsBucketlistShow(false);
        }   else {
            setIsBucketlistShow(true);
        }
    }
    const onCreateBucketlist = ( e : React.MouseEvent ) => {
        e.preventDefault();
        setShowModal(true);
    }
    useEffect(() => {
        if (accessToken){
            const fetchBucketlists = async() => {
                return await getBucketlists(accessToken)
            }
            fetchBucketlists().then(res => setBucketlists(res.data));
        }
    }, [accessToken])

    return (
        <div className="user-bucketlist-wrapper">
            <AccountCircleRoundedIcon id="user-bucketlist-profile-image" onClick={onClickImage}/> 
            <div id="user-bucketlist-profile-name">{user.name}</div>
            <button id="create-bucketlist-btn" onClick={onCreateBucketlist}>버킷리스트 추가하기</button>
            <div id="user-bucketlist-display-criterion">
                <div id="user-bucketlist-wishlist-toggleBtn" onClick={onToggleDisplayType}>{isBucketlistShow ? "위시리스트 보기" : "버킷리스트 보기"}</div>
                <div id="user-bucketlist-criterion-toggleBtn" onClick={onToggleCriterion}>{criterion === "process" ? "종류 별로 보기" : "진행 상태 별로 보기"}</div>
            </div>
            <div id="user-bucketlist-navs">
                <div className="user-bucketlist-nav" style={{ borderBottom : fraction === "entire" ? "4px solid black" : "none", color : fraction === "entire" ? "black" : "#9a1ac"}} id="entire-bucketlist-nav" onClick={() => setFraction('entire')}>전체</div>
                <div className="user-bucketlist-nav" style={{ borderBottom : fraction === "ongoing" ? "4px solid black" : "none", color : fraction === "ongoing" ? "black" : "#9a1ac"}} onClick={() => setFraction('ongoing')}>도전 중</div>
                <div className="user-bucketlist-nav" style={{ borderBottom : fraction === "done" ? "4px solid black" : "none", color : fraction === "done" ? "black" : "#9a1ac"}} onClick={() => setFraction('done')}>완료</div>
            </div>
            <div id="bucketlist-cards-wrapper">
                <BucketlistCard />
                <BucketlistCard />
                <BucketlistCard />
                <BucketlistCard />
                <BucketlistCard />
                <BucketlistCard />
            </div>
            {showModal && <BucketlistCreateModal setShowModal={setShowModal}/>}
        </div>
    )
}

export default UserBucketlist;

