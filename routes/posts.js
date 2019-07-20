const express = require('express')

const router = express.Router();

router.post('/add', (req, res, next) => {
        const body = req.body
        //add on database
})

router.get('/:id', (req, res, next) => {
        const postID = req.params.id_post
        // get id post

})

router.post('/:id/edit', (req, res, next) => {
        const postID = req.params.id_post
        // edit id post

})

router.delete('/:id/delete/', (req, res, next) => {
        const postID = req.params.id_post
        // delete id post
})

module.exports = router;