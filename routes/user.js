const express = require('express')
const userController = require('../controller/user')

const router = express.Router();

router.get('/', userController.showHome)

router.get('/user', userController.getUserID)

router.put('/user/password',
    userController.editUserPassword)

router.put('/user',
    userController.editUser)

router.delete('/user', userController.deleteUser)

module.exports = router