const jwt = require('jsonwebtoken');

const generateToken = (user) => {

    const expiresIn = 60*15;
    
    try{
        const token = jwt.sign({user}, process.env.JWT_TOKEN, {expiresIn});
        return {token, expiresIn};
    }catch(error){
        console.log(error);
    }

}

module.exports = {generateToken};