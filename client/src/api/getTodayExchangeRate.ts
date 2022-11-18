import axios from "axios";

const getTodayExchangeRate = async() => {
    return await axios.get('http://localhost:3002/asset/today/exchange');
}

export default getTodayExchangeRate;