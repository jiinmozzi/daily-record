import React, { useState } from "react";

import axios from "axios";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import "./BucketlistCreateModal.scss";
import FileButton from "../../FileButton";
import MenuItem from "@mui/material/MenuItem/MenuItem";
// import { FormControl, InputLabel, Select, SelectChangeEvent } from "@mui/material";
import createBucketlist from "../../../api/creaetBucketlist";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../store/atom";
import createWishlist from "../../../api/createWishlist";
import saveImage from "../../../api/saveImage";
// imageUrl, createdAt, title, comment, field,isCompleted, isPublic

type BucketlistCreateFormType = {
    setShowModal : (bool : boolean) => void
}
const BucketlistCreateModal = ({setShowModal} : BucketlistCreateFormType) => {
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [creatingObject, setCreatingObject] = useState<string>("bucketlist");
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [field, setField] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [formData, setFormData] = useState<FormData>(new FormData());
    
    const onChangeTitle = ( e : React.ChangeEvent ) => {
        const target = e.target as HTMLInputElement;
        setTitle(target.value);
    }
    const onChangeComment = ( e : React.ChangeEvent ) => {
        const target = e.target as HTMLTextAreaElement;
        setComment(target.value);
    }
    const onSubmit = async( e : React.MouseEvent ) => {
        e.preventDefault();
        // send image
        const imageRes = await saveImage(formData);
        const imageUrl = imageRes.data.url;
        if (creatingObject === "bucketlist"){
            const res = await createBucketlist(accessToken, {imageUrl, title, comment, isPublic, isCompleted : false, field})
            console.log(res);
            return;
        }   else {
            const res = await createWishlist(accessToken, {imageUrl, title, comment, isPublic, isCompleted : false, field})
            console.log(res)
        }
        
        // const res = await createTravelHistory(accessToken, {country : 'EXAMPLE', city : 'EXAMPLE', createdAt : new Date(), title : 'Example', comment : 'Example', departureDate: new Date(), arrivalDate : new Date()  , duration : 1, isPublic : true, imageUrl})   
    }
    return (
        <div className="bucketlist-create-modal-wrapper">
            <div className="bucketlist-create-modal-inner">
                <span id="bucketlist-create-modal-title">??????????????? / ??????????????? ??????</span>
                <div id="bucketlist-create-type-indicator">???????????? ?????? ????????? ???????????????</div>
                <div id="bucketlist-radio-wrapper">
                    <div>
                        <label htmlFor="bucketlist">???????????????</label>
                        <input id="bucketlist" onClick={() => setCreatingObject("bucketlist")} type="radio" value="bucketlist" name="bucketlist" checked={creatingObject === "bucketlist"}/>
                    </div>
                    <div>
                        <label htmlFor="wishlist">???????????????</label>
                        <input id="wishlist" onClick={() => setCreatingObject("wishlist")} type="radio" value="wishlist" name="wishlist" checked={creatingObject === "wishlist"}/>
                    </div>
                </div>
                <CloseRoundedIcon className="close-icon" onClick={() => setShowModal(false)}/>
                <div id="bucketlist-title">
                    <div id="bucketlist-title-text">??????</div>
                    <input id="bucketlist-title-input" type="text" onChange={onChangeTitle} placeholder="??????????????? ????????? ???????????????.."/>
                </div>
                <div id="bucketlist-comment">
                    <div id="bucketlist-comment-text">??????</div>
                    <textarea id="bucketlist-comment-textarea" cols={80} rows={5} onChange={onChangeComment}></textarea>
                </div>
                <div id="bucketlist-create-modal-field">??????</div>
                <div id="bucketlist-types-wrapper">
                    
                    {creatingObject === 'bucketlist' ? 
                    <>
                        <div>
                            <label htmlFor="travel">??????</label>
                            <input className="radio-input-btn" id="travel" onClick={() => setField("travel")} type="radio" value="travel" name="travel" checked={field === "travel"}/>
                        </div>
                        <div>
                            <label htmlFor="activity">????????????</label>
                            <input className="radio-input-btn" id="activity" onClick={() => setField("activity")} type="radio" value="activity" name="activity" checked={field==="activity"}/>
                        </div>
                        <div>
                            <label htmlFor="self-improvement">????????????</label>
                            <input className="radio-input-btn" id="self-improvement" onClick={() => setField("self-improvement")} type="radio" value="self-improvement" name="self-improvement" checked={field==="self-improvement"}/>
                        </div>
                        <div>
                            <label htmlFor="hobby">??????</label>
                            <input className="radio-input-btn" id="hobby" onClick={() => setField("hobby")} type="radio" value="hobby" name="hobby" checked={field==="hobby"}/>
                        </div> 
                        <div>
                            <label htmlFor="dream">???</label>
                            <input className="radio-input-btn" id="dream" onClick={() => setField("dream")} type="radio" value="dream" name="dream" checked={field==="dream"}/>
                        </div> 
                    </>
                    :
                    <>
                        <div>
                            <label htmlFor="asset">??????</label>
                            <input className="radio-input-btn" id="asset" onClick={() => setField("asset")} type="radio" value="asset" name="asset" checked={field==="asset"}/>
                        </div>
                        <div>
                            <label htmlFor="life-style">??????????????????</label>
                            <input className="radio-input-btn" id="life-style" onClick={() => setField("life-style")} type="radio" value="life-style" name="life-style" checked={field==="life-style"}/>
                        </div>
                        <div>
                            <label htmlFor="others">??????</label>
                            <input className="radio-input-btn" id="others" onClick={() => setField("others")} type="radio" value="others" name="others" checked={field==="others"}/>
                        </div>
                    </>
                    }
                    
                </div>
                
                <div id="bucketlist-public-type-indicator">?????? ??????</div>
                <div id="bucketlist-rights-wrapper">
                    <div>
                        <label htmlFor="private">?????????</label>
                        <input className="radio-input-btn" id="private" onClick={() => setIsPublic(false)} type="radio" value="private" name="private" checked={!isPublic}/>
                    </div>
                    <div>
                        <label htmlFor="public">??????</label>
                        <input className="radio-input-btn" id="public" onClick={() => setIsPublic(true)} type="radio" value="public" name="public" checked={isPublic}/>
                    </div>
                </div>
                
                <FileButton formData={formData} setFormData={setFormData} backgroundColor={"rgb(201,215,240)"}/>
                <div id="bucketlist-create-submit-btn" onClick={onSubmit}>????????????</div>
            </div>
        </div>
    )
}

export default BucketlistCreateModal;