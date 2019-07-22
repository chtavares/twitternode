exports.addComments = (req, res, next) => {
    req.db.query(`INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3)`,
        [String(req.body.content), parseInt(req.body.user_id), parseInt(req.params.id)],
        (error) => {
            if (error) {
                res.status(400).send(error)
            }
            res.status(200).json('Comment add')
        })
}

exports.getCommentsID = (req, res, next) => {
    req.db.query(`SELECT * FROM comments WHERE id = $1`,
        [parseInt(req.params.id)], (error, results) => {
            if (error) {
                res.status(400).send(error)
            }
            res.status(200).json(results.rows[0])
        })
}

exports.deleteComments = (req, res, next) => {
    req.db.query(`DELETE FROM comments WHERE id = $1`,
        [parseInt(req.params.id)], (error) => {
            if (error) {
                res.status(400).send(error)
            }
            res.status(200)
        })
}

exports.editComments = (req, res, next) => {
    req.db.query(`UPDATE comments SET content = $1 WHERE id = $2`,
        [String(req.body.content), parseInt(req.params.id)], (err, result) => {
            if (err) {
                res.status(404).end(err)
            }
            res.status(200).send('Update')
        })
}