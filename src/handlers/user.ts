import express, { Request, Response } from 'express'
import { User, UserModel } from '../models/user'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../middlewares/verifyAuthToken'

const userStore = new UserModel()

const index = async(_req: Request, res: Response) => {
    const users = await userStore.index()
    res.json(users)
}

const create = async(req: Request, res: Response) => {
    try {
        const user: User = {
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_password: req.body.user_password,
        }

        const newUser = await userStore.create(user)
        const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET as string)
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const show = async(req: Request, res: Response) => {
    const user = await userStore.show(Number(req.params.id))
    res.json(user)
}

const authenticate = async(req: Request, res: Response) => {
    try {
        const user = await userStore.authenticate(req.body.user_name, req.body.user_password) 
        const token = jwt.sign({user: user}, process.env.TOKEN_SECRET as string)
        res.json(token)
    } catch(err) {
        res.status(401)
        res.json(err)
    }
}


const usersRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', verifyAuthToken, create)
    app.post('/users/authenticate', authenticate )
}

export default usersRoutes