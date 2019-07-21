const express = require('express')

const router = express.Router();

router.get('/', (req, res, next) => {
        // returns all posts on table
        // res.send("Login_page")
        client.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
                if (error) {
                        throw error
                }
                response.status(201).send(`User added with ID: ${result.insertId}`)
        })
})

router.post('/use/create', (req, res, next) => {
        const user_info = req.body
})

router.get('/login', (req, res, next) => {
        // returns login screem

})

router.post('/login', (req, res, next) => {
        // post login screem

})

router.get('/logout', (req, res, next) => {
        // do logout
})

router.get('/user/:id', (req, res, next) => {
        const userID = req.param.id
        // return the id user
})

router.put('/user/:id/edit', (req, res, next) => {
        const userID = req.param.id
        // edit the id user

})

module.exports = router