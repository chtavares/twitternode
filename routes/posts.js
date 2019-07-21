const express = require('express')

const postsController = require('../controller/posts')

const router = express.Router();

router.post('/add', (req, res, next) => {
        const body = req.body
        //add on database
})

router.get('/:id', postsController.getPostID)

router.post('/:id/edit', (req, res, next) => {
        const postID = req.params.id_post
        // edit id post

})

router.delete('/:id/delete/', (req, res, next) => {
        const postID = req.params.id_post
        // delete id post
})

module.exports = router;