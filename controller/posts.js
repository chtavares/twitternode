exports.addPost = (req, res, next) => {
    req.db.query(`INSERT INTO posts (content, user_id) VALUES ($1, $2)`,
        [String(req.body.content), 1], (error) => {
            if (error) {
                res.status(400).send(error)
            }
            res.status(200).send('Post add')
        })
}

exports.getPostID = (req, res, next) => {
    req.db.query(`SELECT * FROM posts WHERE id = $1`,
        [parseInt(req.params.id)], (error, results) => {
            if (error) {
                res.status(400).send(error)
            }
            res.status(200).json(results.rows[0])
        })
}

exports.getPostIDComments = (req, res, next) => {
    req.db.query(`SELECT * FROM comments WHERE post_id = $1`,
        [parseInt(req.params.id)], (error, results) => {
            if (error) {
                res.status(400).send(error)
            }
            res.status(200).json(results.rows)
        })
}

exports.deletePost = (req, res, next) => {
    const postID = parseInt(req.params.id)
    req.db.query(`DELETE FROM comments WHERE post_id = $1`,
        [postID], (error) => {
            if (error) {
                res.status(400).send(error)
            }
        })
    req.db.query(`DELETE FROM posts WHERE id = $1`,
        [postID], (error) => {
            if (error) {
                res.status(400).send(error)
            }
            res.status(200)
        })
}

exports.editPost = (req, res, next) => {
    req.db.query(`UPDATE posts SET content = $1 WHERE id = $2`,
        [String(req.body.content), parseInt(req.params.id)], (err, result) => {
            if (err) {
                res.status(404).end(err)
            }
            res.status(200).send('Update')
        })
}