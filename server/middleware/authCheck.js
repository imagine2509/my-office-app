require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function ( req, res, next ) {
    try {
        const authHeader = req.headers.authorization;
        if ( !authHeader ) {
            return res.status(401).send({message:`Не авторизованный доступ. Header запроса не содержит authorization , где должент быть access токен`});//401 Unauthorized
        }
        const token = authHeader.split(' ')[1];
        if ( !token ) {
            return res.status(401).send({message:`Не авторизованный доступ. Header запроса содержит authorization , но access токена там нет`});//401 Unauthorized
        }
        const decoded = jwt.verify(token, process.env.JWT_ACCESS);
        if ( !decoded ) {
            return res.status(401).send({message:`Не авторизованный доступ. Access токен есть , но мне такой не надо`});//401 Unauthorized
        }
        req.user = decoded;
        next();
    } catch ( e ) {
        switch (e.name) {
            case 'TokenExpiredError':
                res.status(403).json({message: `Не авторизованный доступ. Время жизни access токена закончилось`, error:e});//403 Unauthorized/Inactive
            break;
            case 'JsonWebTokenError':
                res.status(401).json({message: `Не авторизованный доступ. Access токен не валидный`, error:e});//401 Unauthorized
            break;
            default:
                res.status(401).json({message: `Не авторизованный доступ.`, error:e});//401 Unauthorized
            break
        }
    }
}