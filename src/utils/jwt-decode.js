import jwt from 'jsonwebtoken'
import {
    JWT_SECRET
} from '../config/env'

const decodeJWT = (token) => {
    return { id: jwt.verify(token, JWT_SECRET, function (err, decoded) {
                        return decoded.sub.id;
                    })
    }
}

export default decodeJWT
