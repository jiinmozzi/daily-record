import {useState, useEffect} from "react";

import TerminalMainSection from "../../components/Section/TerminalMainSection";
import TerminalNavSection from "../../components/Section/TerminalNavSection";
import TerminalKeyBoardSection from "../../components/Section/TerminalKeyBoardSection";
import "./Terminal.scss";

const Terminal = () => {
    return (
        <div className="terminal-wrapper">
            <TerminalMainSection />
            <TerminalNavSection />
            <TerminalKeyBoardSection />
        </div>
    )
}
export default Terminal;