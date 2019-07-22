exports.addComments = (req, res, next) => {
    req.db.query(`INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3) RETURNING *`,
        [String(req.body.content), parseInt(req.userId), parseInt(req.params.id)],
        (error, results) => {
            if (error) {
                res.status(400).send(error)
            } else {
                res.status(200).send(results.rows[0])
            }
        })
}

exports.getCommentsID = (req, res, next) => {
    req.db.query(`SELECT * FROM comments WHERE id = $1`,
        [parseInt(req.params.id)], (error, results) => {
            if (error) {
                res.status(400).send(error)
            } else {
                res.status(200).json(results.rows[0])
            }
        })
}

exports.deleteComments = (req, res, next) => {
    req.db.query(`DELETE FROM comments WHERE id = $1 and user_id = $2`,
        [parseInt(req.params.id), parseInt(req.userId)], (error) => {
            if (error) {
                res.status(400).send(error)
            } else {
                res.status(200).send('ok')
            }
        })
}

exports.editComments = (req, res, next) => {
    req.db.query(`UPDATE comments SET content = $1 WHERE id = $2 and user_id = $3 RETURNING *`,
        [String(req.body.content), parseInt(req.params.id), parseInt(req.userId)],
        (err, results) => {
            if (err) {
                res.status(404).end(err)
            } else {
                res.status(200).send(results.rows[0])
            }
        })
}