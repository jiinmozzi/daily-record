import React, {useState, useEffect} from "react";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import getUserEmoji from "../../../api/getUserEmoji";
import { accessTokenState } from "../../../store/atom";
import "./EmojiModal.scss";
const emojis = require('emojis-list');

type EmojiModalPropsType = {
    showEmojiModal : boolean,
    setShowEmojiModal : (bool : boolean) => void,
    emojiManageRef : any
}

const EmojiModal = ({showEmojiModal, setShowEmojiModal, emojiManageRef} : EmojiModalPropsType) => {
    const emojiModalRef = useRef<HTMLDivElement>(null);
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [emojisDisplayed, setEmojisDisplayed]= useState<any[]>([]);

    useEffect(() => {
        setEmojisDisplayed(emojis);
        if (accessToken){
            const fetchUserEmojis = async() => {
                return await getUserEmoji(accessToken);
            }
            fetchUserEmojis().then(res => console.log(res));
        }
    }, [accessToken]);
    
    useEffect(() => {
        window.addEventListener('click', (e : any) => {
            if(showEmojiModal && !emojiModalRef.current?.contains(e.target) && !emojiManageRef.current?.contains(e.target)){
                setShowEmojiModal(false);
            }
        });
    }, [])
    return (
        <div className="emoji-modal-wrapper" ref={emojiModalRef}>
            <div className="my-emojis-select">클릭하여 나의 이모지로 등록하세요</div>
            <div className="my-emojis">나의 이모지</div>
            <div></div>
            <div className="whole-emojis">
            {emojis.map((e: any) => {
                return <div className="emoji">{e}</div>
            })}
            </div>
        </div>
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