const crypto = require('crypto');

const encryptPassword = (password : string) => {
	return crypto.createHash("sha512").update(password).digest("base64");
};

export default encryptPassword;
export {}