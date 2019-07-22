const express = require('express')
const accountController = require('../controller/login')
const userController = require('../controller/user')

const router = express.Router();

router.post('/login', accountController.loginUser)

router.post('/user', userController.addUser)

router.get('/login', (req, res, next) => {
    res.status(200).send('Login Page')
})

module.exports = router