import {useState, useEffect} from "react";
import "./EmojiModal.scss";
const emojis = require('emojis-list');

const EmojiModal = () => {
    const [emojisDisplayed, setEmojisDisplayed]= useState<any[]>([]);
    useEffect(() => {
        setEmojisDisplayed(emojis);
        console.log(emojis)
    }, [emojis])
    return (
        <div className="emoji-modal-wrapper">
            <div className="my-emojis">자주 쓰는 이모지</div>
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