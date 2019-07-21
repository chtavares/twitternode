const express = require('express')

const commentsController = require('../controller/comments')

const router = express.Router();

router.post('/add/posts/:id', commentsController.addComments)

router.get('/:id', commentsController.getCommentsID)

router.put('/:id/edit', (req, res, next) => {
        const commentID = req.params.id_comments
        const postID = req.params.id_post

})

router.delete('/:id/delete', commentsController.deleteComments)

module.exports = router;