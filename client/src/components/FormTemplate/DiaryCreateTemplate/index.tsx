import { FormControlLabel, Radio, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React, { useState, useEffect, useRef } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import createDiary from "../../../api/createDiary";
import { accessTokenState } from "../../../store/atom";
import EmojiModal from "../../Modal/EmojiModal";
import "./DiaryCreateTemplate.scss";

const DiaryCreateTemplate = () => {
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const [date, setDate] = useState<Date>();
    const [emoji, setEmoji] = useState<string>("🧑🏻‍💻");
    const [isPublic, setIsPublic] = useState<boolean>(true);
    const [value, setValue] = React.useState<Dayjs | null>(dayjs(Date.now()));
    const [showEmojiModal, setShowEmojiModal] = useState<boolean>(false);
    const emojiManageRef = useRef<HTMLDivElement>(null);

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
        if (newValue){
        setDate(new Date(newValue.toString()));
        }
    };

    const onCreateDiary = async(e : React.FormEvent) => {
        e.preventDefault();
        let title = "";
        let content = "";
        if (titleRef.current)   title = titleRef.current.value;
        if (contentRef.current) content = contentRef.current.value;
        let _date = new Date(Date.now());
        if (date){
            _date = new Date(date)
        }
        
        const res = await createDiary(accessToken, {date : _date, title, content, emoji, isPublic});
        
    }

    return (
        <div className="diary-create-template-wrapper">
            <form id="diary-create-form" onSubmit={onCreateDiary}>
                <div id="diary-date-emoji-wrapper">
                    <div id="diary-date-wrapper">
                        <span id="diary-date-text">날짜</span>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Diary Diary"
                                inputFormat="MM/DD/YYYY"
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <div id="diary-emoji-wrapper">
                        <span id="diary-emoji-text">이모지</span>
                        <div id="selected-emoji-container" ref={emojiManageRef} onClick={() => setShowEmojiModal(true)}>
                        {emoji}
                        {showEmojiModal && <EmojiModal showEmojiModal={showEmojiModal} setShowEmojiModal={setShowEmojiModal} emojiManageRef={emojiManageRef} setEmoji={setEmoji}/>}
                        </div>
                        
                    </div>
                </div>
                <div id="diary-title-wrapper">
                    <span id="diary-title-text">제목</span>
                    <input ref={titleRef} type="text" id="diary-title"/>
                </div>
                <div id="diary-content-wrapper">
                    <span id="diary-content-text">내용</span>
                    <textarea ref={contentRef} id="diary-content" cols={120} rows={10}></textarea>
                </div>
                <div id="diary-public-wrapper">
                    <span id="diary-public-text">권한</span>
                    <FormControlLabel
                        value="start"
                        control={<Radio />}
                        checked={isPublic}
                        onClick={() => setIsPublic(true)}
                        label="공개"
                        // labelPlacement="start"
                    />
                    <FormControlLabel
                        value="start"
                        control={<Radio />}
                        checked={!isPublic}
                        onClick={() => setIsPublic(false)}
                        label="비공개"
                        // labelPlacement="start"
                    />
                </div>
                <div id="submit-btn-box">
                    <button id="diary-submit-btn">
                        <span className="button-top" onClick={onCreateDiary}>제출</span>
                    </button>
                </div>
                
            </form>
        </div>
    )
}

export default DiaryCreateTemplate;