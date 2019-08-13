import Router from 'koa-router'
import PostController from '../controllers/posts-controller'

const router = new Router()
const ctrl = new PostController()

router.post('/posts', ctrl.create)

router.get('/', ctrl.index)

router.get('/posts/:id', ctrl.show)

router.put('/posts/:id', ctrl.update)

router.delete('/posts/:id', ctrl.destroy)

export default router.routes()
