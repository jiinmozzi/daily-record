const yahooFinance = require('yahoo-finance');

const getExchangeRate = async() : Promise<any> => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();

    const res = await yahooFinance.historical({
        symbol : 'USDKRW=X',
        from : `${month === 0 ? year-1 : year}-${month === 0 ? 12 : month}-${date}`,
        to : `${year}-${month+1}-${date}`
    }, (err : Error, quotes : any[]) => {
        console.log(typeof quotes[0]);
        if (err) return null;
        return quotes[0].adjClose;
    })
    return res;
}

export default getExchangeRate;
