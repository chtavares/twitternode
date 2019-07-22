exports.addPost = (req, res, next) => {
    req.db.query(`INSERT INTO posts (content, user_id) VALUES ($1, $2) RETURNING *`,
        [String(req.body.content), parseInt(req.userId)], (error, results) => {
            if (error) {
                res.status(400).send(error)
            } else {
                res.status(200).send(results.rows[0])
            }
        })
}

exports.getPostID = (req, res, next) => {
    req.db.query(`SELECT * FROM posts WHERE id = $1`,
        [parseInt(req.params.id)], (error, results) => {
            if (error) {
                res.status(400).send(error)
            } else {
                res.status(200).json(results.rows[0])
            }
        })
}

exports.getPostIDComments = (req, res, next) => {
    req.db.query(`SELECT * FROM comments WHERE post_id = $1`,
        [parseInt(req.params.id)], (error, results) => {
            if (error) {
                res.status(400).send(error)
            } else {
                res.status(200).json(results.rows)
            }
        })
}

exports.deletePost = (req, res, next) => {
    const postID = parseInt(req.params.id)
    const userId = parseInt(req.userId)
    req.db.query(`DELETE FROM comments WHERE post_id = $1 and user_id = $2`,
        [postID, userId], (error) => {
            if (error) {
                res.status(400).send(error)
            }
        })
    req.db.query(`DELETE FROM posts WHERE id = $1 and user_id = $2 `,
        [postID, userId], (error) => {
            if (error) {
                res.status(400).send(error)
            } else {
                res.status(200).send('ok')
            }
        })
}

exports.editPost = (req, res, next) => {
    req.db.query(`UPDATE posts SET content = $1 WHERE id = $2 and user_id = $3 RETURNING *`,
        [String(req.body.content), parseInt(req.params.id), parseInt(req.userId)],
        (err, results) => {
            if (err) {
                res.status(404).end(err)
            } else {
                res.status(200).send(results.rows[0])
            }
        })
}