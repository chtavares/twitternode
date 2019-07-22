exports.showHome = (req, res, next) => {
    req.db.query(`SELECT * FROM posts ORDER BY id DESC`, (error, result) => {
        if (error) {
            res.status(400).send(error)
        }
        res.status(200).send(result.rows)
    })
}

exports.addUser = (req, res, next) => {
    if (req.body.password1 === req.body.password2) {
        req.db.query(`INSERT INTO users (email, name, password) VALUES ($1, $2, $3)`,
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
}

exports.getUserID = (req, res, next) => {
    req.db.query(`SELECT * FROM users WHERE id = $1`,
        [parseInt(req.params.id)], (error, results) => {
            if (error) {
                res.status(400).send(error)
            }
            res.status(200).json(results.rows)
        })
}

exports.editUser = (req, res, next) => {
    req.db.query(`UPDATE users SET name = $1, email = $2 WHERE id = $3`,
        [String(req.body.name), String(req.body.email), parseInt(req.params.id)], (err) => {
            if (err) {
                res.status(404).end(err)
            }
            res.status(200).send('Update')
        })
}

exports.editUserPassword = (req, res, next) => {
    const userID = parseInt(req.params.id)
    req.db.query(`SELECT password FROM users WHERE id = $1`,
        [userID], (err, result) => {
            if (err) {
                res.status(404).end(err)
            } else if (result.rows[0].password === String(req.body.oldpassword) &&
                String(req.body.password1) === String(req.body.password2)) {
                return
            } else {
                res.status(404).send("The password is incorrect")
            }
        })
    req.db.query(`UPDATE users SET password = $1 WHERE id = $2`,
        [String(req.body.password1), userID], (err) => {
            if (err) {
                res.status(404).end(err)
            }
            res.status(200).send('Update')
        })
}