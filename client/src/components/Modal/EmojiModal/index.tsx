import {useState, useEffect} from "react";
import "./EmojiModal.scss";

type EmojiModalPropsType = {
    emojis : any
    setEmoji : () => void,
    emoji : number,
    shwoEmojiModal : boolean,
    setShowEmojiModal : (bool : boolean) => void,
}
const EmojiModal = ({emojis, setEmoji, emoji} : EmojiModalPropsType) => {
    return (
        <div className="emoji-modal-wrapper">
            <div className="emoji-modal-inner">
                {emojis.map((e: any) => {
                    return <div>{e}</div>
                })}
            </div>
        </div>
    )
}

export default EmojiModal;