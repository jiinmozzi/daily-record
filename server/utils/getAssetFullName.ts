const fs = require('fs');

const getAssetFullName = (ticker : string) => {
    const kospi = fs.readFileSync('../data/kospi.json');
    const kosdaq = fs.readFileSync('../data/kosdaq.json');
    const nyse = fs.readFileSync('../data/nyse.json');
    const nasdaq = fs.readFileSync('../data/nasdaq.json');
    const amex = fs.readFileSync('../data/amex.json');

    const kospiJson = JSON.parse(kospi);
    const kosdaqJson = JSON.parse(kosdaq);
    const nyseJson = JSON.parse(nyse);
    const nasdaqJson = JSON.parse(nasdaq);
    const amexJson = JSON.parse(amex);

    let kospiExists = kospiJson.find((e:any) => e[0] === ticker);
    if (kospiExists) return {
        stockName : kospiExists[1],
        market : "KOSPI",
    }
        
    let kosdaqExists = kosdaqJson.find((e:any) => e[0] === ticker);
    if (kosdaqExists) return {
        stockName : kosdaqExists[1],
        market : "KOSDAQ"
    }

    let nyseExists = nyseJson.find((e:any) => e[0] === ticker);
    if (nyseExists) return {
        stockName : nyseExists[1],
        market : "NYSE"
    }

    let nasdaqExists = nasdaqJson.find((e:any) => e[0] === ticker);
    if (nasdaqExists) return {
        stockName : nasdaqExists[1],
        market : "NASDAQ",
    }
    
    let amexExists = amexJson.find((e:any) => e[0] === ticker);
    if (amexExists) return {
        stockName : amexExists[1],
        market : "AMEX"
    }

    return null;
}

export default getAssetFullName;