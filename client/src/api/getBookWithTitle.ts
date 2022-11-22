import axios from "axios";
const getBookWithTitle = async (title : string) => {
    return await axios({
        url : `https://dapi.kakao.com/v3/search/book?target=title&query=${title}`,
        method : "GET",
        headers : {
            Authorization : `KakaoAK ${process.env.REACT_APP_KAKAO_BOOK_KEY}`,
        }
    })
}

export default getBookWithTitle;