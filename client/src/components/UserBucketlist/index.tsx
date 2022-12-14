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
            <button id="create-bucketlist-btn" onClick={onCreateBucketlist}>??????????????? ????????????</button>
            <div id="user-bucketlist-display-criterion">
                <div id="user-bucketlist-wishlist-toggleBtn" onClick={onToggleDisplayType}>{isBucketlistShow ? "??????????????? ??????" : "??????????????? ??????"}</div>
                <div id="user-bucketlist-criterion-toggleBtn" onClick={onToggleCriterion}>{(isBucketlistShow && criterion === "process") || (!isBucketlistShow && wishlistCriterion === "process") ? "?????? ?????? ??????" : "?????? ?????? ?????? ??????"}</div>
            </div>
            
            {   criterion === "process" && isBucketlistShow ?
                    <div id="user-bucketlist-navs">
                        <div className= {`user-bucketlist-nav ${fraction === "entire" ? "activated" : "no"}`} id="entire-bucketlist-nav" onClick={() => setFraction('entire')}>??????</div>
                        <div className={`user-bucketlist-nav ${fraction === "ongoing" ? "activated" : "no"}`} onClick={() => setFraction('ongoing')}>?????? ???</div>
                        <div className={`user-bucketlist-nav ${fraction === "done" ? "activated" : "no"}`}  onClick={() => setFraction('done')}>??????</div>
                    </div> 
                : isBucketlistShow ?
                    <div id="user-bucketlist-navs">
                        <div className= {`user-bucketlist-nav ${classification === "entire" ? "activated" : "no"}`} id="entire-bucketlist-nav" onClick={() => setClassification('entire')}>??????</div>
                        <div className= {`user-bucketlist-nav ${classification === "travel" ? "activated" : "no"}`} onClick={() => setClassification('travel')}>??????</div>
                        <div className= {`user-bucketlist-nav ${classification === "activity" ? "activated" : "no"}`} onClick={() => setClassification('activity')}>????????????</div>
                        <div className= {`user-bucketlist-nav ${classification === "self-improvement" ? "activated" : "no"}`} onClick={() => setClassification('self-improvement')}>????????????</div>
                        <div className= {`user-bucketlist-nav ${classification === "hobby" ? "activated" : "no"}`} onClick={() => setClassification('hobby')}>??????</div>
                        <div className= {`user-bucketlist-nav ${classification === "dream" ? "activated" : "no"}`} onClick={() => setClassification('dream')}>???</div>
                    </div> 
                : criterion !== "process" ?
                    <div id="user-bucketlist-navs">
                        <div className= {`user-bucketlist-nav ${wishlistClassification === "entire" ? "activated" : "no"}`} id="entire-bucketlist-nav" onClick={() => setWishlistClassification('entire')}>??????</div>
                        <div className= {`user-bucketlist-nav ${wishlistClassification === "asset" ? "activated" : "no"}`} onClick={() => setWishlistClassification('asset')}>??????</div>
                        <div className= {`user-bucketlist-nav ${wishlistClassification === "life-style" ? "activated" : "no"}`} onClick={() => setWishlistClassification('life-style')}>??????????????????</div>
                        <div className= {`user-bucketlist-nav ${wishlistClassification === "others" ? "activated" : "no"}`} onClick={() => setWishlistClassification('others')}>??????</div>
                    </div>
                    : <div id="user-bucketlist-navs">
                        <div className= {`user-bucketlist-nav ${wishlistFraction === "entire" ? "activated" : "no"}`} id="entire-bucketlist-nav" onClick={() => setWishlistFraction('entire')}>??????</div>
                        <div className= {`user-bucketlist-nav ${wishlistFraction === "ongoing" ? "activated" : "no"}`} onClick={() => setWishlistFraction('ongoing')}>?????? ???</div>
                        <div className= {`user-bucketlist-nav ${wishlistFraction === "done" ? "activated" : "no"}`} onClick={() => setWishlistFraction('done')}>??????</div>
                    </div>
            }
            <span id="current-bucketlist-count-text">
                <span style={{fontWeight : "bold"}}>{isBucketlistShow ? bucketlists.length : wishlists.length}</span>?????? <span style={{ fontWeight : "bold"}}>{isBucketlistShow ? '???????????????' : '???????????????'}</span>??? ????????????.
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


