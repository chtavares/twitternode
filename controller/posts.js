const {
        Pool
} = require('pg')

const pool = new Pool({
        host: 'localhost',
        port: 5432,
        database: "twitterdb",
        user: 'postgres',
        password: 'c',
        ssl: 'any',
        max: 10,
})

pool.connect()
        .then(() => console.log('Connected on twitter database'))
        .catch(err => console.error('Connection twitter database error', err.stack))

exports.getPostID = (req, res, next) => {
        const postID = parseInt(req.params.id_post)
        pool.query('SELECT * FROM users WHERE id = $1', [postID], (error, results) => {
                if (error) {
                        console.log(error)
                        res.status(400).send(error)
                }
                // pool.end()
                res.status(200).json(results.rows)
        })
}