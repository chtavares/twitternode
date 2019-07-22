const express = require('express')

const commentsController = require('../controller/comments')

const router = express.Router();

router.post('/add/post/:id', commentsController.addComments)

router.get('/:id', commentsController.getCommentsID)

router.put('/:id/edit', commentsController.editComments)

router.delete('/:id/delete', commentsController.deleteComments)

module.exports = router;