const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJwt = (req, res, next) => {
    const { token } = req.query;

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'No token provided'
        });
    }
    try {
        const { user } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Token invalid'
        });

    }
};


module.exports = {
    validateJwt
}