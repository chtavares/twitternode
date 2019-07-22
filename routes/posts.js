const express = require('express')
const postsController = require('../controller/posts')

const router = express.Router();

router.post('/', postsController.addPost)

router.get('/:id', postsController.getPostID)

router.get('/:id/comments', postsController.getPostIDComments)

router.put('/:id', postsController.editPost)

router.delete('/:id', postsController.deletePost)

module.exports = router;