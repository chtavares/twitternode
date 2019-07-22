const express = require('express')

const postsController = require('../controller/posts')

const router = express.Router();

router.post('/add', postsController.addPost)

router.get('/:id', postsController.getPostID)

router.put('/:id/edit', postsController.editPost)

router.delete('/:id/delete', postsController.deletePost)

module.exports = router;