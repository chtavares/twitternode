const express = require('express')
const adminController = require('../controller/admin')

const router = express.Router();

router.get('/', adminController.showHome)

router.post('/user', adminController.addUser)

router.get('/user/:id', adminController.getUserID)

router.post('/login', (req, res, next) => {
    // post login screem

})

router.post('/logout', (req, res, next) => {
    // do logout
})

router.put('/user/:id/password',
    adminController.editUserPassword)

router.put('/user/:id',
    adminController.editUser)

module.exports = router