import sendRequest from "./sendRequest";

export type TravelHistoryType = {
    country : string
    city : string,
    createdAt : Date,
    title : string,
    imageUrl : string,    
    comment : string,
    departureDate : Date,
    arrivalDate : Date,
    duration : number,
    isPublic : boolean,
}
const createTravelHistory = async(token : string, {country, city,  createdAt, title, comment, departureDate, duration, isPublic = true, imageUrl} : TravelHistoryType) => {
    return await sendRequest('travel/story/visited/create', "POST", {country, city, createdAt, title, comment, departureDate, duration, isPublic, imageUrl}, true, token);
}

export default createTravelHistory;