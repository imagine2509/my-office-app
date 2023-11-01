require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function ( req, res, next ) {
    try {
        const authHeader = req.headers.authorization;
        if ( !authHeader ) {
            return res.status(401).send('Не авторизованный доступ. Нет даже намёка на токен');
        }
        const token = authHeader.split(' ')[1];
        if ( !token ) {
            return res.status(401).send('Не авторизованный доступ. Нет access токена');
        }
        const decoded = jwt.verify(token, process.env.JWT_ACCESS);
        if ( !decoded ) {
            return res.status(401).send('Не авторизованный доступ. Access токен есть , но мне такой не надо');
        }
        req.user = decoded;
        next();
    } catch ( e ) {
        res.status(500).send(e.message);
    }
}