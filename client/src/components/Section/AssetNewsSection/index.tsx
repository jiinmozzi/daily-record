import {useState, useEffect} from "react";
import getAssetNews from "../../../api/getAssetNews";
import NewsCard from "../../Card/NewsCard";
import "./AssetNewsSection.scss";

const AssetNewsSection = () => {
    const [news, setNews] = useState<any[]>([]);
    useEffect(() => {
        const fetchNews = async() => {
            return await getAssetNews();
        }
        fetchNews().then(res => setNews(res.data));
    }, [])
    useEffect(() => {
        console.log(news);
    }, [news])
    return (
        <div className="asset-news-section-wrapper">
            <span id="news-main-text">오늘의 뉴스</span>
            <div id="news-cards-outer-wrapper">
            {news && news.map((e : any) => <NewsCard title={e.title} author={e.author} description={e.description} publishedAt={e.publishedAt} url={e.url} urlToImage={e.urlToImage} />)}
            </div>
        </div>
    )
}

export default AssetNewsSection;