const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');

exports.loginUser = (req, res, next) => {
    dotenv.config()
    req.db.query(`SELECT id FROM users WHERE email = $1 and password = $2`,
        [String(req.body.email), String(req.body.password)], (error, results) => {
            if (error) {
                res.status(500).send('Login inválido!');
            } else {
                const id = results.rows[0].id

                const token = jwt.sign({
                    id
                }, process.env.SECRET);
                res.status(200).send({
                    auth: true,
                    token: token
                });
            }
        })
}