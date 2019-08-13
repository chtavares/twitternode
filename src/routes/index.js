import Router from 'koa-router'
import users from './users-router'
import posts from './posts-router'
import comments from './comments-router'

const router = new Router()
const api = new Router()

api.use(users)
api.use(posts)
api.use(comments)

router.use(api.routes())

export default router
