const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');

exports.checkAuth = (req, res, next) => {
    dotenv.config()
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({
            auth: false,
            message: 'No token provided.'
        })
    }
    jwt.verify(token, process.env.AUTHSECRET, function (err, decoded) {
        if (err) return res.status(500).send({
            auth: false,
            message: 'Failed to authenticate token.'
        });

        req.userId = decoded.id;
        next();
    })
}