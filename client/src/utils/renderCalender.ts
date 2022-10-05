let now = new Date();
const month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const renderCalendar = (year ?: number, month ?: number) : number[] => {
    let currentYear : number, currentMonth : number;
    year !== undefined ? currentYear = year : currentYear = now.getFullYear();
    month !== undefined ? currentMonth = month : currentMonth = now.getMonth();
    
    const prevLast : Date = new Date(currentYear, currentMonth, 0);
    const thisLast : Date = new Date(currentYear, currentMonth+1, 0);

    const plDate : number = prevLast.getDate();
    const plDay : number = prevLast.getDay();

    const tlDate : number = thisLast.getDate();
    const tlDay : number = thisLast.getDay();

    const prevDates : number[] = [];
    const thisDates : number[] = [...Array(tlDate+1).keys()].slice(1);
    const nextDates : number[] = [];

    // plDay === 6 <=> plday is saturday;
    if ( plDay !== 6 ){
        for ( let i=0; i< plDay + 1; i++ ){
            prevDates.unshift(plDate - i);
        }
    }

    for ( let i=1; i< 7-tlDay; i++ ){
        nextDates.push(i);
    }
    const dates : number[] = prevDates.concat(thisDates, nextDates);
    return dates;
}

export default renderCalendar;