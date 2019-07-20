const express = require('express')

const router = express.Router();

router.post('/add/post/:id', (req, res, next) => {
        const postID = req.params.id
        //add post
})

router.get('/:id_comments/post/:id_post', (req, res, next) => {
        const commentID = req.params.id_comments
        const postID = req.params.id_post
        console.log(commentID, postID)
        // get id post

})

router.post('/:id/edit/post/:id', (req, res, next) => {
        const commentID = req.params.id_comments
        const postID = req.params.id_post
        // edit id post

})

router.delete('/:id/delete/post/:id', (req, res, next) => {
        const commentID = req.params.id_comments
        const postID = req.params.id_post
        // delete id post
})

module.exports = router;