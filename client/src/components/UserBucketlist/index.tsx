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
import getWishlists from "../../api/getWishlists";


const UserBucketlist = () => {
    const [user, setUser] = useRecoilState<UserType>(userState);
    const [isBucketlistShow, setIsBucketlistShow] = useState<boolean>(true);

    const [criterion, setCriterion] = useState<string>("process");
    const [fraction, setFraction] = useState<string>("entire"); 
    const [classification, setClassification] = useState<string>("entire");

    const [wishlistCriterion, setWishlistCriterion] = useState<string>("process");
    const [wishlistFraction, setWishlistFraction] = useState<string>("entire");
    const [wishlistClassification, setWishlistClassification] = useState<string>("entire");
    
    
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [bucketlists, setBucketlists] = useState<any[]>([]);
    const [wishlists, setWishlists] = useState<any[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const onClickImage = (e : React.MouseEvent) => {

    }

    const onToggleCriterion = (e : React.MouseEvent) => {
        if (criterion === "process"){
            setCriterion("classification");
        }   else {
            setCriterion("process");
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
                return await getBucketlists(accessToken);
            }
            const fetchWishlists = async() => {
                return await getWishlists(accessToken);
            }
            fetchBucketlists().then(res => setBucketlists(res.data));
            fetchWishlists().then(res => setWishlists(res.data));
        }
    }, [accessToken])

    return (
        <div className="user-bucketlist-wrapper">
            <AccountCircleRoundedIcon id="user-bucketlist-profile-image" onClick={onClickImage}/> 
            <div id="user-bucketlist-profile-name">{user.name}</div>
            <button id="create-bucketlist-btn" onClick={onCreateBucketlist}>버킷리스트 추가하기</button>
            <div id="user-bucketlist-display-criterion">
                <div id="user-bucketlist-wishlist-toggleBtn" onClick={onToggleDisplayType}>{isBucketlistShow ? "위시리스트 보기" : "버킷리스트 보기"}</div>
                <div id="user-bucketlist-criterion-toggleBtn" onClick={onToggleCriterion}>{(isBucketlistShow && criterion === "process") || (!isBucketlistShow && wishlistCriterion === "process") ? "종류 별로 보기" : "진행 상태 별로 보기"}</div>
            </div>
            
            {   criterion === "process" && isBucketlistShow ?
                    <div id="user-bucketlist-navs">
                        <div className= {`user-bucketlist-nav ${fraction === "entire" ? "activated" : "no"}`} id="entire-bucketlist-nav" onClick={() => setFraction('entire')}>전체</div>
                        <div className={`user-bucketlist-nav ${fraction === "ongoing" ? "activated" : "no"}`} onClick={() => setFraction('ongoing')}>도전 중</div>
                        <div className={`user-bucketlist-nav ${fraction === "done" ? "activated" : "no"}`}  onClick={() => setFraction('done')}>완료</div>
                    </div> 
                : isBucketlistShow ?
                    <div id="user-bucketlist-navs">
                        <div className= {`user-bucketlist-nav ${classification === "entire" ? "activated" : "no"}`} id="entire-bucketlist-nav" onClick={() => setClassification('entire')}>전체</div>
                        <div className= {`user-bucketlist-nav ${classification === "travel" ? "activated" : "no"}`} onClick={() => setClassification('travel')}>여행</div>
                        <div className= {`user-bucketlist-nav ${classification === "activity" ? "activated" : "no"}`} onClick={() => setClassification('activity')}>엑티비티</div>
                        <div className= {`user-bucketlist-nav ${classification === "self-improvement" ? "activated" : "no"}`} onClick={() => setClassification('self-improvement')}>자기계발</div>
                        <div className= {`user-bucketlist-nav ${classification === "hobby" ? "activated" : "no"}`} onClick={() => setClassification('hobby')}>취미</div>
                        <div className= {`user-bucketlist-nav ${classification === "dream" ? "activated" : "no"}`} onClick={() => setClassification('dream')}>꿈</div>
                    </div> 
                : criterion !== "process" ?
                    <div id="user-bucketlist-navs">
                        <div className= {`user-bucketlist-nav ${wishlistClassification === "entire" ? "activated" : "no"}`} id="entire-bucketlist-nav" onClick={() => setWishlistClassification('entire')}>전체</div>
                        <div className= {`user-bucketlist-nav ${wishlistClassification === "asset" ? "activated" : "no"}`} onClick={() => setWishlistClassification('asset')}>자산</div>
                        <div className= {`user-bucketlist-nav ${wishlistClassification === "life-style" ? "activated" : "no"}`} onClick={() => setWishlistClassification('life-style')}>라이프스타일</div>
                        <div className= {`user-bucketlist-nav ${wishlistClassification === "others" ? "activated" : "no"}`} onClick={() => setWishlistClassification('others')}>기타</div>
                    </div>
                    : <div id="user-bucketlist-navs">
                        <div className= {`user-bucketlist-nav ${wishlistFraction === "entire" ? "activated" : "no"}`} id="entire-bucketlist-nav" onClick={() => setWishlistFraction('entire')}>전체</div>
                        <div className= {`user-bucketlist-nav ${wishlistFraction === "ongoing" ? "activated" : "no"}`} onClick={() => setWishlistFraction('ongoing')}>도전 중</div>
                        <div className= {`user-bucketlist-nav ${wishlistFraction === "done" ? "activated" : "no"}`} onClick={() => setWishlistFraction('done')}>완료</div>
                    </div>
            }
            <span id="current-bucketlist-count-text">
                <span style={{fontWeight : "bold"}}>{isBucketlistShow ? bucketlists.length : wishlists.length}</span>개의 <span style={{ fontWeight : "bold"}}>{isBucketlistShow ? '버킷리스트' : '위시리스트'}</span>가 있습니다.
            </span>
            <div id="bucketlist-cards-wrapper">
                {isBucketlistShow && bucketlists.map(item => {
                    return (
                        <BucketlistCard isBucketlist={true} _id={item._id} title={item.title} comment={item.comment} field={item.field} createdAt={item.createdAt} isCompleted={item.isCompleted} isPublic={item.isPublic} imageUrl={item.imageUrl}/>
                    )
                })}
                {!isBucketlistShow && wishlists.map(item => {
                    return (
                        <BucketlistCard isBucketlist={false} _id={item._id}title={item.title} comment={item.comment} field={item.field} createdAt={item.createdAt} isCompleted={item.isCompleted} isPublic={item.isPublic} imageUrl={item.imageUrl}/>
                    )
                })}
            </div>
            {showModal && <BucketlistCreateModal setShowModal={setShowModal}/>}
        </div>
    )
}

export default UserBucketlist;


