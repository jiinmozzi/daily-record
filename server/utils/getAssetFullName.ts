const fs = require('fs');

const path = require('path');
const dirPath = path.resolve(__dirname, '../data');

const getAssetFullName = (ticker : string) => {
    const kospi = fs.readFileSync(`${dirPath}/kospi.json`);
    const kosdaq = fs.readFileSync(`${dirPath}/kosdaq.json`);
    const nyse = fs.readFileSync(`${dirPath}/nyse.json`);
    const nasdaq = fs.readFileSync(`${dirPath}/nasdaq.json`);
    const amex = fs.readFileSync(`${dirPath}/amex.json`);

    const kospiJson = JSON.parse(kospi);
    const kosdaqJson = JSON.parse(kosdaq);
    const nyseJson = JSON.parse(nyse);
    const nasdaqJson = JSON.parse(nasdaq);
    const amexJson = JSON.parse(amex);

    let kospiExists = kospiJson.find((e:any) => e[0] === ticker);
    if (kospiExists) return {
        ticker : ticker,
        stockName : kospiExists[1],
        market : "KOSPI",
    }
        
    let kosdaqExists = kosdaqJson.find((e:any) => e[0] === ticker);
    if (kosdaqExists) return {
        ticker : ticker,
        stockName : kosdaqExists[1],
        market : "KOSDAQ"
    }

    let nyseExists = nyseJson.find((e:any) => e[0] === ticker);
    if (nyseExists) return {
        ticker : ticker,
        stockName : nyseExists[1],
        market : "NYSE"
    }

    let nasdaqExists = nasdaqJson.find((e:any) => e[0] === ticker);
    if (nasdaqExists) return {
        ticker : ticker,
        stockName : nasdaqExists[1],
        market : "NASDAQ",
    }
    
    let amexExists = amexJson.find((e:any) => e[0] === ticker);
    if (amexExists) return {
        ticker : ticker,
        stockName : amexExists[1],
        market : "AMEX"
    }
    return null;
    // throw new Error(`NO TICKER IN JSON FILE ${ticker}`);
}

export default getAssetFullName;