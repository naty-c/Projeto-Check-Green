require('dotenv').config();
const { verify } = require("jsonwebtoken");

async function auth(req, res, next) {
    try {
        const { authorization } = req.headers;

        req.payload = verify(authorization, process.env.SECRET_JWT);

        req.user = req.user || {};
        req.user.id = req.payload.id;

        next()

    } catch (error) {
        return res.status(401).json({
            message: "Autentication failed!",
            cause: error.message
        })
    }
}

module.exports = { auth }