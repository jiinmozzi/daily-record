import AssetSearchBar from "../../SearchBar/AssetSearchBar";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import "./AssetSearchSection.scss";
const AssetSearchSection = () => {
    const navigate = useNavigate();
    const [isPortfolioPage, setIsPortfolioPage] = useState<boolean>(false);

    useEffect(() => {
        const path = window.location.pathname.split('/');
        console.log(path)
        if (path.length < 3 && path[2] !== 'portfolio'){
            setIsPortfolioPage(false);
        }   else {
            setIsPortfolioPage(true);
        }
    }, [])

    return (
        <div className="asset-search-section-wrapper">
            <div className="asset-proverb" style={{position : "relative"}}>
                {isPortfolioPage ? null : <div id="my-portfolio-nav" onClick={() => navigate('/asset/portfolio')}>내 자산 보러가기</div> }
                <div className="proverb-container">
                    <span className="proverb-text">"&nbsp;두툼한 지갑이 무조건 좋다고 말할 수 없다.</span><br></br>
                    <span className="proverb-text">그러나 텅빈 지갑은 확실히 나쁘다." &nbsp;</span>
                </div>
                <AssetSearchBar />
            </div>
        </div>
    )
}

export default AssetSearchSection;