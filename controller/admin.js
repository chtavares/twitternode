const dbController = require('./db')

exports.showHome = (req, res, next) => {
        const pool = dbController.connectDB()
        pool.query(`SELECT * FROM posts`, (error, result) => {
                if (error) {
                        res.status(400).send(error)
                }
                res.status(200).send(result.rows[0])
        })
        pool.end()
}

// curl -d '{"email":"christian@gmail.com", "name":"christian tavares","password1":"123445" ,"password2":"123445"}' -H "Content-Type: application/json" -X POST http://localhost:3000/user/create
exports.addUser = (req, res, next) => {
        const email = req.body.email
        const name = req.body.name
        const password1 = req.body.password1
        const password2 = req.body.password2
        const pool = dbController.connectDB()

        if (password1 === password2) {
                pool.query(`INSERT INTO users (email, name, password) VALUES ($1, $2, $3)`,
                        [email, name, password1], (error) => {
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