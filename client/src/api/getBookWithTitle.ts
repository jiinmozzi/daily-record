import axios from "axios";
const getBookWithTitle = async (title : string) => {
    return await axios({
        url : `https://dapi.kakao.com/v3/search/book?target=title&query=${title}`,
        method : "GET",
        headers : {
            Authorization : "KakaoAK edb5a5edd30b1cb5a39f113de30fe7c1",
        }
    })
}

export default getBookWithTitle;