const express = require('express')
const commentsController = require('../controller/comments')

const router = express.Router();

router.post('/:id', commentsController.addComments)

router.get('/:id', commentsController.getCommentsID)

router.put('/:id', commentsController.editComments)

router.delete('/:id', commentsController.deleteComments)

module.exports = router;