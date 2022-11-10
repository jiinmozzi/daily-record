import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import "./FileButton.scss";

const FileButton = () => {
    return (
        <div className="file-button-wrapper">
            <input className="upload-name" value="첨부파일" placeholder="첨부파일"></input>
            <label htmlFor="upload-file">업로드</label>
            <input type="file" id="upload-file"/>
        </div>
    )
}
export default FileButton;