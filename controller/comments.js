const dbController = require('./db')

// curl -d '{"content":"Vamos tomar sim", "user_id":1}' -H "Content-Type: application/json" -X POST http://localhost:3000/comments/add/post/1
exports.addComments = (req, res, next) => {
        const content = req.body.content
        const userID = parseInt(req.body.user_id)
        const postID = parseInt(req.params.id)
        const pool = dbController.connectDB()
        pool.query(`INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3)`,
                [content, userID, postID], (error, results) => {
                        if (error) {
                                res.status(400).send(error)
                        }
                        res.status(200).json('ok')
                })
        pool.end()
}

exports.getCommentsID = (req, res, next) => {
        const pool = dbController.connectDB()
        const postID = parseInt(req.params.id)
        pool.query(`SELECT * FROM comments WHERE id = $1`,
                [postID], (error, results) => {
                        if (error) {
                                res.status(400).send(error)
                        }
                        res.status(200).json(results.rows[0])
                })
        pool.end()
}

exports.deleteComments = (req, res, next) => {
        const pool = dbController.connectDB()
        const postID = parseInt(req.params.id)
        pool.query(`DELETE FROM comments WHERE id = $1`,
                [postID], (error) => {
                        if (error) {
                                res.status(400).send(error)
                        }
                })
        pool.end()
        res.redirect('/')
}