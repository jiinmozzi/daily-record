const jwt = require('jsonwebtoken');

const generateRefreshToken = (name : string, email : string) => {
    const emailId = email.slice(0, email.indexOf('@'));
    const token = jwt.sign({name, emailId}, process.env.JWT_SECRET, {expiresIn : '90d'})
    return token;
}

export default generateRefreshToken;