import User from '../../database/models/User'
import bcrypt from 'bcrypt'
import {
  BadRequest,
  NotFound,
  Unauthorized,
  InternalServerError,
  hashPassword,
  generateJWT
} from '../utils'

export default class Controller {
  async login (ctx) {
    const { body } = ctx.request

    const user = await new User({ email: body.email})
      .fetch()
      .catch(() => { throw new Unauthorized() })

    if (!user) {
      throw new Unauthorized('Usuario não encontrado')
    }

    const isValid = await bcrypt.compare(body.password, user.attributes.password)

    if (!isValid) {
      throw new Unauthorized('Senha Incorreta')
    }

    user.attributes = generateJWT(user.toJSON())

    ctx.body = user
  }

  async index (ctx) {
    const users = await new User()
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

    ctx.body = users
  }

  async show (ctx) {
    const user = await new User({ id: ctx.params.id })
      .fetch()
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = user
  }

  async create (ctx) {
    const { body } = ctx.request

    body.password = await hashPassword(body.password)

    const user = await new User({
      name: body.name,
      email: body.email,
      password: body.password,
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = await new User({ id: user.attributes.id })
      .fetch()
      .catch(err => { throw new InternalServerError(err.toString()) })
  }

  async update (ctx) {
    const { body } = ctx.request

    const decode = decodeJWT(ctx.request.header.authorization.split(' ')[1])

    if (body.password) {
      body.password = await hashPassword(body.password)
    }

    const user = await new User({ id: decode.id })
      .save({
        name: body.name,
        email: body.email,
        password: body.password,
      }, { method: 'update' })
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = user
  }

  async destroy (ctx) {
    const user = decodeJWT(ctx.request.header.authorization.split(' ')[1])
    await new User({ id: user.id })
      .destroy()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = { id: ctx.params.id }
  }
}
