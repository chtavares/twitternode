exports.showHome = (req, res, next) => {
    req.db.query(`SELECT * FROM posts ORDER BY create_at DESC`, (error, result) => {
        if (error) {
            res.status(400).send(error)
        } else {
            res.status(200).send(result.rows)
        }
    })
}

exports.addUser = (req, res, next) => {
    if (req.body.password1 === req.body.password2) {
        req.db.query(`INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *`,
            [String(req.body.email), String(req.body.name), String(req.body.password1)],
            (error, results) => {
                if (error) {
                    res.status(400).send(error)
                } else {
                    res.status(200).send(results.rows[0])
                }
            })
    } else {
        res.status(404).send("The password 1 and password 2 aren't the same")
    }
}

exports.getUserID = (req, res, next) => {
    req.db.query(`SELECT * FROM users WHERE id = $1`,
        [parseInt(req.userId)], (error, results) => {
            if (error) {
                res.status(400).send(error)
            } else {
                res.status(200).json(results.rows)
            }
        })
}

exports.editUser = (req, res, next) => {
    req.db.query(`UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *`,
        [String(req.body.name), String(req.body.email), parseInt(req.userId)],
        (err, results) => {
            if (err) {
                res.status(404).end(result.rows[0])
            } else {
                res.status(200).send(results.rows[0])
            }
        })
}

exports.editUserPassword = (req, res, next) => {
    const userID = parseInt(req.userId)
    req.db.query(`SELECT password FROM users WHERE id = $1`,
        [userID],
        (err, result) => {
            if (err) {
                res.status(404).end(err)
            } else if (result.rows[0].password === String(req.body.oldpassword) &&
                String(req.body.password1) === String(req.body.password2)) {
                return
            } else {
                res.status(404).send("The password is incorrect")
            }
        })
    req.db.query(`UPDATE users SET password = $1 WHERE id = $2 RETURNING *`,
        [String(req.body.password1), userID], (err, results) => {
            if (err) {
                res.status(404).end(err)
            } else {
                res.status(200).send(results.rows[0])
            }
        })
}

exports.deleteUser = (req, res, next) => {
    const userID = parseInt(req.userId)
    req.db.query(`DELETE FROM comments WHERE user_id = $1`,
        [userID], (error) => {
            if (error) {
                res.status(400).send(error)
            }
        })
    req.db.query(`DELETE FROM posts WHERE user_id = $1`,
        [userID], (error) => {
            if (error) {
                res.status(400).send(error)
            }
        })
    req.db.query(`DELETE FROM users WHERE id = $1`,
        [userID], (error) => {
            if (error) {
                res.status(400).send(error)
            } else {
                res.redirect('/login')
            }
        })
}