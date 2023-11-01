require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function ( req, res, next ) {
    try {
        const authHeader = req.headers.authorization;
        if ( !authHeader ) {
            return res.status(401).send({message:`Не авторизованный доступ. Нет даже намёка на токен`});//401 Unauthorized
        }
        const token = authHeader.split(' ')[1];
        if ( !token ) {
            return res.status(401).send({message:`Не авторизованный доступ. Нет access токена`});//401 Unauthorized
        }
        const decoded = jwt.verify(token, process.env.JWT_ACCESS);
        if ( !decoded ) {
            return res.status(401).send({message:`Не авторизованный доступ. Access токен есть , но мне такой не надо`});//401 Unauthorized
        }
        req.user = decoded;
        next();
    } catch ( e ) {
        res.status(401).json({message: `Не авторизованный доступ.`, error:e.message});//401 Unauthorized
    }
}