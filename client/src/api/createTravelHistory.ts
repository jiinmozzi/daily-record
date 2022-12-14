import sendRequest from "./sendRequest";

export type TravelHistoryType = {
    country : string[]
    city : string[],
    title : string,
    imageUrl : string,    
    comment : string,
    departureDate : Date,
    arrivalDate : Date,
    duration : number,
    isPublic : boolean,
}
const createTravelHistory = async(token : string, {country, city, title, comment, departureDate, arrivalDate, duration, isPublic = true, imageUrl} : TravelHistoryType) => {
    return await sendRequest('travel/story/visited', "POST", {country, city, title, comment, departureDate, arrivalDate, duration, isPublic, imageUrl}, true, token);
}

export default createTravelHistory;