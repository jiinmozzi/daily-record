// return value format : 20221122
const getTodayEightDigitDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();

    return Number(String(year) + String(month).padStart(2, '0') + String(date).padStart(2, '0'));
}

export default getTodayEightDigitDate