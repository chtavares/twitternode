const dbController = require('./db')

exports.showHome = (req, res, next) => {
        const pool = dbController.connectDB()
        pool.query(`SELECT * FROM posts ORDER BY id DESC`, (error, result) => {
                if (error) {
                        res.status(400).send(error)
                }
                res.status(200).send(result.rows)
        })
        pool.end()
}

exports.addUser = (req, res, next) => {
        const pool = dbController.connectDB()
        if (req.body.password1 === req.body.password2) {
                pool.query(`INSERT INTO users (email, name, password) VALUES ($1, $2, $3)`,
                        [String(req.body.email), String(req.body.name), String(req.body.password1)], (error) => {
                                if (error) {
                                        res.status(400).send(error)
                                }
                                res.status(200).send('ok')
                                return;
                        })
        } else {
                res.status(404).send("The password 1 and password 2 aren't the same")
        }
        pool.end()
}

exports.getUserID = (req, res, next) => {
        const pool = dbController.connectDB()
        pool.query(`SELECT * FROM users WHERE id = $1`,
                [parseInt(req.params.id)], (error, results) => {
                        if (error) {
                                res.status(400).send(error)
                        }
                        res.status(200).json(results.rows)
                })
        pool.end()
}