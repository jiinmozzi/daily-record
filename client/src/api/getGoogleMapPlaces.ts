import sendRequest from "./sendRequest";

const getGoogleMapPlaces = async(searchQuery : string) => {
    return await sendRequest(`travel/google/map/${searchQuery}`, 'GET', {}, false);
}

export default getGoogleMapPlaces;