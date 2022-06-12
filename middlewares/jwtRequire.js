const jwt = require('jsonwebtoken');

const requireToken = (req, res, next) => {

    try {
        let token = req.headers?.authorization;
        if (!token) throw new Error('No token provided');

        token = token.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_TOKEN);
        req.uid = payload.user;
        next();
    } catch (error) {

        const manakeErrorToken = {
            ['invalid token']: 'Token invalido',
            ['jwt malformed']: 'Token malformado',
            ['jwt expired']: 'Token expirado',
            ['invalid signature']: 'Firma invalida',
            ['No Bearer']: 'Utiliza formato Bearer'
        }

        console.log(error);
        res.status(401).json({
            message: manakeErrorToken[error.message] || 'Error desconocido',
        })

    }
}


module.exports = { requireToken };