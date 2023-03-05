import jwt from 'jsonwebtoken'
import {Request, Response} from 'express'

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token as string, process.env.TOKEN_SECRET as string)
        next()
    } catch(err) {
        res.status(401)
    }
}

export default verifyAuthToken