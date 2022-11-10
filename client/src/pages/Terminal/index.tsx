import {useState, useEffect} from "react";

import TerminalSection from "../../components/Section/TerminalSection";

import "./Terminal.scss";

const Terminal = () => {
    return (
        <div className="terminal-wrapper">
            <TerminalSection />
        </div>
    )
}
export default Terminal;