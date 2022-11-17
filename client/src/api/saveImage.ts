import axios from "axios";

const saveImage = async(formData : FormData) => {
    return await axios.post('http://localhost:3002/image/create', formData);
}

export default saveImage;