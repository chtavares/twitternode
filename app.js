const express = require('express')
const bodyParser = require('body-parser');

const loginRoutes = require('./routes/login')
const logoutRoutes = require('./routes/logout')
const userRoutes = require('./routes/user');
const commentsRoutes = require('./routes/comments');
const postsRoutes = require('./routes/posts');
const errorRoutes = require('./routes/error');

const db = require('./utils/db')
const auth = require('./middleware/auth')

db.initDB()

const app = express()

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())


app.use((req, res, next) => {
    req.db = db.connectDB()
    next()
    req.db.end()
})

app.use(loginRoutes)
app.use(auth.checkAuth)
app.use(userRoutes)
app.use('/comments', commentsRoutes)
app.use('/posts', postsRoutes)
app.use('/logout', logoutRoutes)
app.use(errorRoutes)

app.listen(3000, () => console.log('Server running on http://localhost:3000/'));