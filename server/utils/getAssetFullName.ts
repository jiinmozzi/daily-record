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
    if (kospiExists) return kospiExists[1];
        
    let kosdaqExists = kosdaqJson.find((e:any) => e[0] === ticker);
    if (kosdaqExists) return kosdaqExists[1];

    let nyseExists = nyseJson.find((e:any) => e[0] === ticker);
    if (nyseExists) return nyseExists[1];

    let nasdaqExists = nasdaqJson.find((e:any) => e[0] === ticker);
    if (nasdaqExists) return nasdaqExists[1];
    
    let amexExists = amexJson.find((e:any) => e[0] === ticker);
    if (amexExists) return amexExists[1];

    return null;
}

export default getAssetFullName;