import Router from 'koa-router'
import CommentController from '../controllers/comments-controller'

const router = new Router()
const ctrl = new CommentController()

router.post('/comments/:postid', ctrl.create)

router.get('/comments/:id', ctrl.show)

router.put('/comments/:id', ctrl.update)

router.delete('/comments/:id', ctrl.destroy)

export default router.routes()
