import Comment from '../../database/models/Comment'
import {
    BadRequest,
    NotFound,
    decodeJWT
} from '../utils'

export default class Controller {
    async show(ctx) {
        const comment = await new Comment({
                id: ctx.params.id
            })
            .fetch()
            .catch(err => {
                throw new NotFound(err.toString())
            })

        ctx.body = comment
    }

    async create(ctx) {
        const {
            body
        } = ctx.request

        const user = decodeJWT(ctx.request.header.authorization.split(' ')[1])

        const comment = await new Comment({
                content: body.content,
                post_id: ctx.params.postid,
                user_id: user.id,

            })
            .save()
            .catch(err => {
                throw new BadRequest(err.toString())
            })

        ctx.body = comment
    }

    async update(ctx) {
        const {
            body
        } = ctx.request

        const user = decodeJWT(ctx.request.header.authorization.split(' ')[1])

        const comment = await new Comment({
                id: ctx.params.id
            })
            .where('id', ctx.params.id)
            .where('user_id', user.id)
            .save({
                content: body.content
            }, {
                method: 'update'
            })
            .catch(err => {
                throw new NotFound(err.toString())
            })

        ctx.body = comment
    }

    async destroy(ctx) {
        const user = decodeJWT(ctx.request.header.authorization.split(' ')[1])
        await new Comment({
                id: ctx.params.id,
            })
            .where('id', ctx.params.id)
            .where('user_id', user.id)
            .destroy()
            .catch(err => {
                throw new BadRequest(err.toString())
            })

        ctx.body = {
            id: ctx.params.id
        }
    }
}