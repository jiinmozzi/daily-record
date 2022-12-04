const yahooFinance = require('yahoo-finance');

const getExchangeRate = async() : Promise<any> => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();

    const res = await yahooFinance.historical({
        symbol : 'USDKRW=X',
        from : `${year-2}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`,
        to : `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
    }, (err : Error, quotes : any[]) => {
        if (err) return null;
        return quotes;
    })
    return res;
}

export default getExchangeRate;
