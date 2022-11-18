import "./TerminalKeyBoardSection.scss";

const TerminalKeyBoardSection = () => {
    return (
        <div className="terminal-keyboard-section-wrapper">
            <span id="terminal-keyboard-section-text">
                나만의&nbsp;
                <span className="keyboard-text">키</span>
                <span className="keyboard-text">보</span>
                <span className="keyboard-text">드</span> 꾸미기
            </span>
                
            <div id="keyboard-wrapper">
                <div id="keyboard">

                    <div className="keyboard-row">
                        <div className="keyboard-key fn">
                            <span id="esc">esc</span>
                        </div>
                        <div className="keyboard-key fn">
                            <span>F1</span>
                        </div>
                        <div className="keyboard-key fn">
                            <span>F2</span>
                        </div>
                        <div className="keyboard-key fn">
                            <span>F3</span>
                        </div>
                        <div className="keyboard-key fn">
                            <span>F4</span>
                        </div>
                        <div className="keyboard-key fn">
                            <span>F5</span>
                        </div>
                        <div className="keyboard-key fn">
                            <span>F6</span>
                        </div>
                        <div className="keyboard-key fn">
                            <span>F7</span>
                        </div>
                        <div className="keyboard-key fn">
                            <span>F8</span>
                        </div>
                        <div className="keyboard-key fn">
                            <span>F9</span>
                        </div> 
                        <div className="keyboard-key fn">
                            <span>F10</span>
                        </div> 
                        <div className="keyboard-key fn">
                            <span>F11</span>
                        </div> 
                        <div className="keyboard-key fn">
                            <span>F12</span>
                        </div> 
                        <div className="keyboard-key fn">
                            <span>EJECT</span>
                        </div> 
                    </div>

                    <div className="keyboard-row" id="numbers">
                        <div className="keyboard-key">
                            <b>~</b>
                            <span>`</span>
                        </div>
                        <div className="keyboard-key">
                            <b>!</b>
                            <span>1</span>
                        </div>
                        <div className="keyboard-key">
                            <b>@</b>
                            <span>2</span>
                        </div>
                        <div className="keyboard-key">
                            <b>#</b>
                            <span>3</span>
                        </div>
                        <div className="keyboard-key">
                            <b>$</b>
                            <span>4</span>
                        </div>
                        <div className="keyboard-key">
                            <b>%</b>
                            <span>5</span>
                        </div>
                        <div className="keyboard-key">
                            <b>^</b>
                            <span>6</span>
                        </div>
                        <div className="keyboard-key">
                            <b>&amp;</b>
                            <span>7</span>
                        </div>
                        <div className="keyboard-key">
                            <b>*</b>
                            <span>8</span>
                        </div>
                        <div className="keyboard-key">
                            <b>(</b>
                            <span>9</span>
                        </div> 
                        <div className="keyboard-key">
                            <b>)</b>
                            <span>0</span>
                        </div> 
                        <div className="keyboard-key alt">
                            <b>_</b>
                            <span>-</span>
                        </div> 
                        <div className="keyboard-key">
                            <b>+</b>
                            <span>=</span>
                        </div> 
                        <div className="keyboard-key" id="delete">
                            <span>DELETE</span>
                        </div> 
                    </div>
                    <div className="keyboard-row" id="qwerty">
                        <div className="keyboard-key" id="tab">
                            <span>tab</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>q</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>w</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>e</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>r</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>t</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>y</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>u</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>i</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>o</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>p</span>
                        </div> 
                        <div className="keyboard-key alt">
                            <b>	&#123;</b>
                            <span>[</span>
                        </div> 
                        <div className="keyboard-key alt">
                            <b>&#125;</b>
                            <span>]</span>
                        </div> 
                        <div className="keyboard-key alt">
                            <b>|</b>
                            <span>\</span>
                        </div> 
                    </div>
                    <div className="keyboard-row" id="asdf">
                        <div className="keyboard-key" id="caps">
                            <b></b>
                            <span>caps lock</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>a</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>s</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>d</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>f</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>g</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>h</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>j</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>k</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>l</span>
                        </div> 
                        <div className="keyboard-key alt">
                            <b>:</b>
                            <span>;</span>
                        </div> 
                        <div className="keyboard-key alt">
                            <b>"</b>
                            <span>'</span>
                        </div> 
                        <div className="keyboard-key alt" id="enter">
                            <span>return</span>
                        </div> 

                    </div>
                    
                    <div className="keyboard-row" id="zxcv">
                        <div className="keyboard-key shiftleft">
                            <span>Shift</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>z</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>x</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>c</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>v</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>b</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>n</span>
                        </div> 
                        <div className="keyboard-key">
                            <span>m</span>
                        </div> 
                        <div className="keyboard-key alt">
                            <b>&lt;</b>
                            <span>,</span>
                        </div> 
                        <div className="keyboard-key alt">
                            <b>&gt;</b>
                            <span>.</span>
                        </div> 
                        <div className="keyboard-key alt">
                            <b>?</b>
                            <span>/</span>
                        </div> 
                        <div className="keyboard-key shiftright">
                            <span>Shift</span>
                        </div> 
                        
                    </div>

                    <div className="keyboard-row" id="bottomrow">
                        <div className="keyboard-key" id="fn">
                            <span>fn</span>
                        </div> 
                        <div className="keyboard-key" id="control">
                            <span>control</span>
                        </div> 
                        <div className="keyboard-key option" id="optionleft">
                            <span>option</span>
                        </div> 
                        <div className="keyboard-key command" id="commandleft">
                            <span>command</span>
                        </div> 
                        <div className="keyboard-key" id="spacebar">
                            
                        </div> 
                        <div className="keyboard-key command" id="commandright">
                            <span>command</span>
                        </div> 
                        <div className="keyboard-key option" id="optionright">
                            <span>option</span>
                        </div> 
                        <div style={{display : "flex"}}>
                            <div className="keyboard-key" id="left">
                                <span>&#x25C0;</span>
                            </div> 
                            <div>
                                <div className="keyboard-key" id="up">
                                    <span>&#x25B2;</span>
                                </div> 
                                <div className="keyboard-key" id="down">
                                    <span>&#x25BC;</span>
                                </div> 
                            </div>
                            <div className="keyboard-key" id="right">
                                <span>&#x25B6;</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TerminalKeyBoardSection;