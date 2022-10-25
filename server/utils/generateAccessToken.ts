const jwt = require('jsonwebtoken');

const generateAccessToken = () => {
    const token = jwt.sign({}, process.env.JWT_SECRET, {expiresIn : 30 * 60});
    return token;
}

export default generateAccessToken;