import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import "./UserBucketlist.scss";

const UserBucketlist = () => {
    return (
        <div className="user-bucketlist-wrapper">
            <div id="bucketlist-nav">
                <div>전체</div>
                <div>도전 중</div>
                <div>완료</div>
            </div>
        </div>
    )
}

export default UserBucketlist;