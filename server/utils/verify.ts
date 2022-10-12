const jwt = require('jsonwebtoken');
const verify = (token : string) : any => {
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        return verified;
    }   catch ( err : any ) {
        if ( err.message === "jwt expired"){
            
            console.log("TOKEN EXPIRED");
            return;
        }   else if ( err.message === "invalid token"){
            console.log("INVALID TOKEN");
            return;
        }   else {
            console.log(err);
            console.log('VERIFYING TOKEN ERROR OCCURED');
            return;
        }
    
    }   
}


export default verify;
export {}