import {useState, useEffect} from "react";

import "./AssetPortfolioGraphSection.scss";


type AssetPortfolioGraphSectionPropsType = {
    assetPortfolio : any[],
}

const AssetPortfolioGraphSection = ({assetPortfolio} : AssetPortfolioGraphSectionPropsType) => {

    const [displayMode, setDisplayMode] = useState<string>("asset");
    
    return (
        <div className="asset-portfolio-graph-section-wrapper">
            <div id="asset-portfolio-graph-section-inner">
                <div id="asset-portfolio-donut-wrapper">
                    <div id="asset-portfolio-donut-graph">
                        <div id="asset-portfolio-donut-toggle-btn">
                            <div className="donut-toggle-btn-text" style={{ backgroundColor : displayMode==="asset" ? "rgb(39,47,68)" : ""}} onClick={() => setDisplayMode('asset')}>자산 구성</div>
                            <div className="donut-toggle-btn-text" style={{ backgroundColor : displayMode==="dividend" ? "rgb(39,47,68)" : ""}} onClick={() => setDisplayMode('dividend')}>배당 구성</div>
                        </div>
                        <div id="asset-portfolio-actual-donut">
                            진짜 
                        </div>
                    </div>
                    <div id="asset-portfolio-weight-graph">비중</div>
                </div>
                <div id="asset-portfolio-expected-dividend">막대 그래프</div>
            </div>
        </div>
    )
}
export default AssetPortfolioGraphSection;