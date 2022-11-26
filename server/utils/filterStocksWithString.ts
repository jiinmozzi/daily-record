const fs = require('fs');
const path = require('path');

// retrieving files from files folder
const dirPath = path.resolve(__dirname, '../data');
/** 사용자 INPUT >> Search Bar Selection */
const filterStocksWithString = (input : string) => {

    const nasdaqJson = fs.readFileSync(`${dirPath}/nasdaq.json`);
    let nasdaq = JSON.parse(nasdaqJson);
    const nasdaqResult = nasdaq.filter(
        (e:any) => 
        e[0].toLowerCase().includes(input.toLowerCase()) || 
        e[1].toLowerCase().includes(input.toLowerCase())
    );
    
    const nyseJson = fs.readFileSync(`${dirPath}/nyse.json`);
    let nyse = JSON.parse(nyseJson);
    const nyseResult = nyse.filter(
        (e:any) => 
        e[0].toLowerCase().includes(input.toLowerCase()) || 
        e[1].toLowerCase().includes(input.toLowerCase())
    );

    const kospiJson = fs.readFileSync(`${dirPath}/kospi.json`);
    let kospi = JSON.parse(kospiJson);
    const kospiResult = kospi.filter(
        (e:any) => 
        e[0].toLowerCase().includes(input.toLowerCase()) || 
        e[1].toLowerCase().includes(input.toLowerCase())
    );
    const kosdaqJson = fs.readFileSync(`${dirPath}/kosdaq.json`);
    let kosdaq = JSON.parse(kosdaqJson);
    const kosdaqResult = kosdaq.filter(
        (e:any) => 
        e[0].toLowerCase().includes(input.toLowerCase()) || 
        e[1].toLowerCase().includes(input.toLowerCase())
    );

    const amexJson = fs.readFileSync(`${dirPath}/amex.json`);
    let amex = JSON.parse(amexJson);
    const amexResult = amex.filter(
        (e:any) => 
        e[0].toLowerCase().includes(input.toLowerCase()) || 
        e[1].toLowerCase().includes(input.toLowerCase())
    );
    console.log({'NASDAQ' : [...nasdaqResult], 'NYSE' : [...nyseResult]}, {'KOSPI' : [...kospiResult]}, {'KOSDAQ': [...kosdaqResult]}, {'AMEX' : [...amexResult]});
    return {'NASDAQ' : [...nasdaqResult], 'NYSE' : [...nyseResult], 'KOSPI' : [...kospiResult], 'KOSDAQ': [...kosdaqResult], 'AMEX' : [...amexResult]};
}

export default filterStocksWithString;