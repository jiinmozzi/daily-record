import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import "./BucketlistCreateModal.scss";
import FileButton from "../../FileButton";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { FormControl, InputLabel, Select, SelectChangeEvent } from "@mui/material";
// imageUrl, createdAt, title, comment, field,isCompleted, isPublic

type BucketlistCreateFormType = {
    setShowModal : (bool : boolean) => void
}
const BucketlistCreateModal = ({setShowModal} : BucketlistCreateFormType) => {
    const [title, setTitle] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [field, setField] = useState<string>("");
    const onChangeTitle = ( e : React.ChangeEvent ) => {
        const target = e.target as HTMLInputElement;
        setTitle(target.value);
    }

    const onChangeField = (e : SelectChangeEvent<typeof field>) => {
        setField(e.target.value);
    }

    return (
        <div className="bucketlist-create-modal-wrapper">
            <div className="bucketlist-create-modal-inner">
                <span id="bucketlist-create-modal-title">버킷리스트 추가</span>
                <CloseRoundedIcon className="close-icon" onClick={() => setShowModal(false)}/>
                <div id="bucketlist-title">
                    <div id="bucketlist-title-text">제목</div>
                    <input id="bucketlist-title-input" type="text" onChange={onChangeTitle} placeholder="버킷리스트 제목을 입력하세요.."/>
                </div>
                <div id="bucketlist-comment">
                    <div id="bucketlist-comment-text">내용</div>
                    <textarea id="bucketlist-comment-textarea" cols={80} rows={5}></textarea>
                </div>
                <div id="bucketlist-create-modal-field">종류</div>
                <FormControl sx={{ m: 1, minWidth: 80, maxWidth : 80, maxHeight : 80}}>
                  <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        value={field}
                        label="Age"
                        onChange={onChangeField}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                {/* <div id="bucketlist-create-modal-field">
                    <div id="bucketlist-field-title">종류</div>
                    <select id="bucketlist-field-select">
                        <option id="" value="">엑티비티</option>
                    </select>
                </div> */}
                <FileButton />
                <div id="">

                </div>
            </div>
        </div>
    )
}

export default BucketlistCreateModal;