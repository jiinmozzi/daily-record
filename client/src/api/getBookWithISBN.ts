import axios from "axios";
const getBookWithISBN = async(ISBN : string) => {
    return await axios({
        url : `https://dapi.kakao.com/v3/search/book?target=isbn&query=${ISBN}`,
        method : "GET",
        headers : {
            Authorization : `KakaoAK ${process.env.REACT_APP_KAKAO_BOOK_KEY}`,
        }
    })
}

export default getBookWithISBN;