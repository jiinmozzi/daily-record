import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import "./TerminalCollectionForm.scss";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../store/atom";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FileButton from "../../FileButton";
import axios from "axios";
import createTerminalPortfolio from "../../../api/createTerminalPortfolio";

const TerminalCollectionForm = () => {
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const githubRef = useRef<HTMLInputElement>(null);
    const siteRef = useRef<HTMLInputElement>(null);
    const [dateTo, setDateTo] = useState<Date>(new Date());
    const [dateFrom, setDateFrom] = useState<Date>(new Date());
    const [formData, setFormData] = useState<FormData>(new FormData());
    const [status, setStatus] = useState<string>("notyet");
    const [dateToValue, setDateToValue] = React.useState<Dayjs | null>(dayjs(Date.now()));
    const [dateFromValue, setDateFromValue] = React.useState<Dayjs | null>(dayjs(Date.now()));
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [date, setDate] = useState<Date>();
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);


    const onCreateCollection = async( e : React.FormEvent ) => {
        e.preventDefault();
        const imageRes = await axios.post('http://localhost:3002/image', formData);

        const imageUrl = imageRes.data.url;
        const title = titleRef?.current?.value ? titleRef.current.value : "";
        const content = contentRef?.current?.value ? contentRef.current.value : "";
        const githubLink = githubRef?.current?.value ? githubRef.current.value : "";
        const siteUrl = siteRef?.current?.value ? siteRef.current.value : "";
        let isCompleted = false;
        if (status === "completed"){
            isCompleted = true;
        }
        const res = await createTerminalPortfolio(accessToken, {dateFrom, dateTo, title, content, imageUrl, githubLink, siteUrl, isCompleted, onProcess : status, isPublic})
        console.log(res);
    }

    const handleChangeDateFrom = (newValue: Dayjs | null) => {
        setDateFromValue(newValue);
        if (newValue){
        setDateFrom(new Date(newValue.toString()));
        }
    };
    const handleChangeDateTo = (newValue: Dayjs | null) => {
        setDateToValue(newValue);
        if (newValue){
        setDateTo(new Date(newValue.toString()));
        }
    };

    return (
        <div className="terminal-collection-form-wrapper">
            <span id="terminal-collection-span">작업물 콜렉션 만들기</span>
            <form id="terminal-collection-form" onSubmit={onCreateCollection}>
                <div id="collection-form-title-wrapper">
                    <div className="collection-form-text" id="collection-form-title-text">콜렉션 제목</div>
                    <input id="collection-title-input" type="text" ref={titleRef}/>
                </div>
                <div id="collection-form-content-wrapper">
                    <div className="collection-form-text">콜렉션 내용</div>
                    <textarea ref={contentRef} id="collection-form-content-textarea" cols={70} rows={10}></textarea>
                </div>
                <div id="collection-form-content-process-wrapper">
                    <div className="collection-form-text">진행 상황</div>
                    <div className="collection-form-radio-wrapper">
                        <label htmlFor="notyet">진행 전</label>
                        <input className="status-input-radio" type="radio" onClick={() => setStatus("notyet")} id="notyet" checked={status === "notyet"}/>
                        <label htmlFor="ongoing">진행 중</label>
                        <input className="status-input-radio" type="radio" onClick={() => setStatus("ongoing")} id="ongoing" checked={status === "ongoing"}/>
                        <label htmlFor="completed">완료</label>
                        <input className="status-input-radio" type="radio" onClick={() => setStatus("completed")} id="completed" checked={status === "completed"}/>
                    </div>
                </div>
                <div className="collection-form-date-wrapper">
                    <div className="collection-form-text">시작일</div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Diary Diary"
                            inputFormat="MM/DD/YYYY"
                            value={dateFromValue}
                            onChange={handleChangeDateFrom}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <div className="collection-form-date-wrapper">
                    <div className="collection-form-text">종료일</div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Diary Diary"
                            inputFormat="MM/DD/YYYY"
                            value={dateToValue}
                            onChange={handleChangeDateTo}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <div className="collection-form-horizontal-wrapper">
                    <div className="collection-form-text">Github</div>
                    <input id="github-input" type="text" ref={githubRef} />
                </div>
                <div className="collection-form-horizontal-wrapper">
                    <div className="collection-form-text">Site Url</div>
                    <input id="site-input" type="text" ref={siteRef} />
                </div>
                <div className="collection-form-privacy-wrapper">
                    <div className="collection-form-text">열람 권한</div>
                    <label htmlFor="private">비공개</label>
                    <input id="private" type="radio" checked={!isPublic} onClick={() => setIsPublic(false)}/>
                    <label id="public-label" htmlFor="public">공개</label>
                    <input id="public" type="radio" checked={isPublic} onClick={() => setIsPublic(true)}/>
                </div>
                <FileButton formData={formData} setFormData={setFormData} backgroundColor={"rgba(107,102,242, 0.7)"}/>
                <button id="terminal-collection-submit-btn">제출</button>
            </form>
        </div>
    )
}

export default TerminalCollectionForm