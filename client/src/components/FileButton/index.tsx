import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { useRef } from "react";
import "./FileButton.scss";
import axios from "axios";
import createTravelHistory from "../../api/createTravelHistory";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../store/atom";
import { TravelHistoryType } from "../../api/createTravelHistory";
const FileButton = () => {
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [fileName, setFileName] = useState<string>("");
    const imageRef = useRef<HTMLInputElement>(null);
    
    const onChange = (e : React.ChangeEvent) => {
        if (imageRef && imageRef.current && imageRef.current.files){
            // console.log(imageRef.current.files[0].name);
            setFileName(imageRef.current.files[0].name);
        }
    }
    const onSubmit = async(e : React.FormEvent) => {
        e.preventDefault();
        
        
        const formData = new FormData();
        let data = null;
        if (imageRef && imageRef.current && imageRef.current.files){
            data = imageRef.current.files[0];
        }
        if (data){
            formData.append('img', data);
        }
        const imageRes = await axios.post('http://localhost:3002/test/img', formData);
        const imageUrl = imageRes.data.url;

        const res = await createTravelHistory(accessToken, {country : 'EXAMPLE', city : 'EXAMPLE', createdAt : new Date(), title : 'Example', comment : 'Example', departureDate: new Date(), arrivalDate : new Date()  , duration : 1, isPublic : true, imageUrl})
        // const res = await axios.post('http://localhost:3002/test/img', formData);
    }

    return (
        <div className="file-button-wrapper">
            <form onSubmit={onSubmit}>
                <input className="upload-name" value={fileName} placeholder="첨부파일"></input>
                <label htmlFor="upload-file">업로드</label>
                <input ref={imageRef} type="file" id="upload-file" onChange={onChange}/>
                <button>submit</button>
            </form>
        </div>
    )
}
export default FileButton;