import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./TerminalMainSection.scss";
import boy from "../../../assets/boy.jpeg";
const TerminalMainSection = () => {
    const navigate = useNavigate();
    const developerText : string[] = ['developer', 'creator', 'innovator', 'digital nomad'];
    const [textOrder, setTextOrder] = useState<number>(0);

    useEffect(() => {
        const textInterval = setInterval(() => {
            setTextOrder((prev) => (prev + 1) % 4);
        }, 2000)
        return () => clearInterval(textInterval)
    }, [])
    return (
        <div className="terminal-section-wrapper">
            <div id="terminal-introduction">
                <p id="terminal-main-text">
                    "computer is a stupid machine with the ability to do incredibly smart things,<br></br>
                    while computer programmers are smart people with the ability to do incredibly stupid things.<br></br><br></br>
                    <span id="emphasizing-sentence">They are, in short, a <span id="emphasis">perfect match</span>.”</span>
                </p>
                <span id="terminal-developer-text">Here I am.<br></br>
                    <span id="developer-introduction-text">I am a <span id="developer-introduction-detail">{developerText[textOrder]}</span></span>
                </span>
            </div>
            <div id="terminal-subsection">
                <img id="terminal-section-image" src={boy} alt="boy" />
            </div>
        </div>
    )
}

export default TerminalMainSection
