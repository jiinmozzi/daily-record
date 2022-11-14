import AssetSearchBar from "../../SearchBar/AssetSearchBar";
import { useNavigate } from "react-router-dom";

const AssetSearchSection = () => {
    const navigate = useNavigate();
    return (
        <div className="asset-proverb" style={{position : "relative"}}>
            <div id="my-portfolio-nav" onClick={() => navigate('/asset/portfolio')}>내 자산 보러가기</div>
            <div className="proverb-container">
                <span className="proverb-text">"&nbsp;두툼한 지갑이 무조건 좋다고 말할 수 없다.</span><br></br>
                <span className="proverb-text">그러나 텅빈 지갑은 확실히 나쁘다." &nbsp;</span>
            </div>
            <AssetSearchBar />
        </div>
    )
}

export default AssetSearchSection;