import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { useRef } from "react";
import "./FileButton.scss";
import axios from "axios";
import createTravelHistory from "../../api/createTravelHistory";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../store/atom";
import { TravelHistoryType } from "../../api/createTravelHistory";

type FileButtomPropsType = {
    formData : FormData,
    setFormData : (newformData : any) => void,
    backgroundColor : string
}
const FileButton = ({formData, setFormData, backgroundColor} : FileButtomPropsType) => {
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [fileName, setFileName] = useState<string>("");
    const imageRef = useRef<HTMLInputElement>(null);
    const newFormData = new FormData();
    const onChange = (e : React.ChangeEvent) => {
        let data = null;
        if (imageRef && imageRef.current && imageRef.current.files){
            setFileName(imageRef.current.files[0].name);
            data = imageRef.current.files[0];
            newFormData.append('img', data);
            setFormData(newFormData);
            console.log(newFormData);
        }
    }

    return (
        <div className="file-button-wrapper">
            <form>
                <input className="upload-name" value={fileName} placeholder="첨부파일"></input>
                <label htmlFor="upload-file" style={{ backgroundColor : backgroundColor }}>업로드</label>
                <input ref={imageRef} type="file" id="upload-file" onChange={onChange}/>
            </form>
        </div>
    )
}
export default FileButton;