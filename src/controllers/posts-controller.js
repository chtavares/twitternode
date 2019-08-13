import Post from '../../database/models/Post'
import {
    BadRequest,
    NotFound,
    InternalServerError,
    decodeJWT
} from '../utils'

export default class Controller {
    async index(ctx) {
        const posts = await new Post()
            .fetchAll()
            .catch(err => {
                throw new InternalServerError(err.toString())
            })

        ctx.body = posts
    }

    async show(ctx) {
        const post = await new Post({
                id: ctx.params.id
            })
            .fetch()
            .catch(err => {
                throw new NotFound(err.toString())
            })

        ctx.body = post
    }

    async create(ctx) {
        const {
            body
        } = ctx.request

        const user = decodeJWT(ctx.request.header.authorization.split(' ')[1])

        const post = await new Post({
                content: body.content,
                user_id: user.id,
            })
            .save()
            .catch(err => {
                throw new BadRequest(err.toString())
            })

        ctx.body = post
    }

    async update(ctx) {
        const {
            body
        } = ctx.request

        const user = decodeJWT(ctx.request.header.authorization.split(' ')[1])

        const post = await new Post({
                id: ctx.params.id,
            })
            .where('id', ctx.params.id)
            .where('user_id', user.id)
            .save({
                content: body.content,
            }, {
                method: 'update'
            })
            .catch(err => {
                throw new NotFound(err.toString())
            })

        ctx.body = post
    }

    async destroy(ctx) {
        const user = decodeJWT(ctx.request.header.authorization.split(' ')[1])
        await new Post({
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
