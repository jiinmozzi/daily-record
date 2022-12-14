import { Alert } from "@mui/material";
import React, {useState, useEffect} from "react";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import addUserEmoji from "../../../api/addUserEmoji";
import getUserEmoji from "../../../api/getUserEmoji";
import { accessTokenState } from "../../../store/atom";
import "./EmojiModal.scss";
const emojis = require('emojis-list');

type EmojiModalPropsType = {
    showEmojiModal : boolean,
    setShowEmojiModal : (bool : boolean) => void,
    emojiManageRef : any,
    setEmoji? : (str : string) => void,
}

const EmojiModal = ({showEmojiModal, setShowEmojiModal, emojiManageRef, setEmoji} : EmojiModalPropsType) => {
    const emojiModalRef = useRef<HTMLDivElement>(null);
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [emojisDisplayed, setEmojisDisplayed]= useState<any[]>([]);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [userEmojis, setUserEmojis] = useState<string[]>([]);
    const [onCreatePage, setOnCreatePage] = useState<boolean>(false);

    useEffect(() => {
        setEmojisDisplayed(emojis);
        if (accessToken){
            const fetchUserEmojis = async() => {
                return await getUserEmoji(accessToken);
            }
            fetchUserEmojis().then(res => setUserEmojis(res.data));
        }
    }, [accessToken]);
    
    useEffect(() => {
        const path = window.location.pathname.split('/');
        if (path.length === 3 && path[2] === 'create'){
            setOnCreatePage(true);
        }
        window.addEventListener('click', (e : any) => {
            if(showEmojiModal && !emojiModalRef.current?.contains(e.target) && !emojiManageRef.current?.contains(e.target)){
                setShowEmojiModal(false);
            }
        });
    }, [])

    const onClickMyEmoji = (e : React.MouseEvent) => {
        e.stopPropagation();
        const target = e.target as HTMLDivElement;
        if (onCreatePage && setEmoji){
            setEmoji(target.innerText);
            setShowEmojiModal(false);
            
        }
    }
    const submitEmoji = async(e : React.MouseEvent) => {
        e.stopPropagation();
        const target = e.target as HTMLDivElement;
        if (onCreatePage && setEmoji){
            setEmoji(target.innerText);
            setShowEmojiModal(false);
            return;
        }
        
        const emojiRes = await addUserEmoji(accessToken, {emoji : target.innerText})
        if (emojiRes.message === "OK"){
            setUserEmojis([...userEmojis, emojiRes.data]);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 1500)
            window.location.href="/diary";
        }
        return;
    }


    return (
        <>
        <div className="emoji-modal-wrapper" ref={emojiModalRef}>
            <div className="my-emojis-select">{onCreatePage ? "일기에 등록할 이모지를 선택하세요." : "클릭하여 나의 이모지로 등록하세요"}</div>
            <div className="my-emojis-text">나의 이모지</div>
            <div className="my-emojis">{userEmojis.map((e:string) => {
                return (
                    <div className="my-emoji" onClick={onClickMyEmoji}>{e}</div>
                )
            })}</div>
            <div className="whole-emojis">
            {emojis.map((e: any, idx : number) => {
                return <div className="emoji" onClick={submitEmoji}>{e}</div>
            })}
            </div>
        </div>
        {showAlert && <Alert id="emoji-success-alert" severity="success">이모지 등록에 성공하였습니다.</Alert>}
        </>
    )
}

export default EmojiModal;

// type EmojiModalPropsType = {
//     emojis : any
//     setEmoji : () => void,
//     emoji : string,
//     shwoEmojiModal : boolean,
//     setShowEmojiModal : (bool : boolean) => void,    
// }