const express = require('express')

const router = express.Router();

router.get((req, res, next) => {
    res.status(404).send("Error on Server")
})

module.exports = router