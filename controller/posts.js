const dbController = require('./db')

exports.addPost = (req, res, next) => {
        const pool = dbController.connectDB()
        pool.query(`INSERT INTO posts (content, user_id) VALUES ($1, $2)`,
                [String(req.body.content), parseInt(req.body.user_id)], (error, results) => {
                        if (error) {
                                res.status(400).send(error)
                        }
                        res.status(200).json('ok')
                })
        pool.end()
}

exports.getPostID = (req, res, next) => {
        const pool = dbController.connectDB()
        pool.query(`SELECT * FROM posts WHERE id = $1`,
                [parseInt(req.params.id)], (error, results) => {
                        if (error) {
                                res.status(400).send(error)
                        }
                        res.status(200).json(results.rows[0])
                })
        pool.end()
}

exports.deletePost = (req, res, next) => {
        const pool = dbController.connectDB()
        const postID = parseInt(req.params.id)
        pool.query(`DELETE FROM comments WHERE post_id = $1`,
                [postID], (error) => {
                        if (error) {
                                res.status(400).send(error)
                        }
                })
        pool.query(`DELETE FROM posts WHERE id = $1`,
                [postID], (error) => {
                        if (error) {
                                res.status(400).send(error)
                        }
                })
        pool.end()
        res.redirect('/')
}

exports.editPost = (req, res, next) => {
        const pool = dbController.connectDB()
        pool.query(`UPDATE posts SET content = $1 WHERE id = $2`,
                [String(req.body.content), parseInt(req.params.id)], (err, result) => {
                        if (err) {
                                res.status(404).end(err)
                        }
                        res.status(200).send('Update')
                })
}