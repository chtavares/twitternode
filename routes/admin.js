const express = require('express')
const adminController = require('../controller/admin')

const router = express.Router();

router.get('/', adminController.showHome)

router.post('/user/create', adminController.addUser)

router.get('/user/:id', adminController.getUserID)

router.get('/login', (req, res, next) => {
        // returns login screem
})

router.post('/login', (req, res, next) => {
        // post login screem

})

router.get('/logout', (req, res, next) => {
        // do logout
})



router.put('/user/:id/edit', (req, res, next) => {
        const userID = req.param.id
        // edit the id user

})

module.exports = router