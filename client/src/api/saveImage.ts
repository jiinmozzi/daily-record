import sendRequest from "./sendRequest";

const saveImage = async(formData : FormData) => {
    return await sendRequest('image', 'POST', {formData}, false);
}

export default saveImage;