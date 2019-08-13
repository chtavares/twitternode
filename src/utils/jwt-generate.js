import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env'

const generateJWT = (user = {}) => {
  const id  = user.id
  return {
    ...user,
    token: jwt.sign({ sub: { id } }, JWT_SECRET)
  }
}

export default generateJWT