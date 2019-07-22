const express = require('express')
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const commentsRoutes = require('./routes/comments');
const postsRoutes = require('./routes/posts');
const errorRoutes = require('./routes/error');
const db = require('./utils/db')

const app = express()

db.initDB()

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

app.use((req, res, next) => {
    req.db = db.connectDB()
    next()
    req.db.end()
})

app.use(adminRoutes)
app.use('/comments', commentsRoutes)
app.use('/posts', postsRoutes)
app.use(errorRoutes)

app.listen(3000, () => console.log('Server running on http://localhost:3000/'));