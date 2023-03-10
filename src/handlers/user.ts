import express, { Request, Response } from 'express'
import { User, UserModel } from '../models/user'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../middlewares/verifyAuthToken'

const userStore = new UserModel()

const index = async(_req: Request, res: Response) => {
    try {
        const users = await userStore.index()
        res.json(users)
    } catch(err) {
        res.status(500).send({ message: 'Error retrieving users' })
    }
}

const create = async(req: Request, res: Response) => {
    try {
        const user: User = {
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_password: req.body.user_password,
        }

        const newUser = await userStore.create(user)
        const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET as string)
        res.json(token)
    } catch(err) {
        res.status(400).send({ message: 'Error creating user', error: err})
    }
}

const show = async(req: Request, res: Response) => {
    try {
        const user = await userStore.show(Number(req.params.id))
        if (!user) {
            res.status(404).send({ message: 'User not found' })
        } else {
            res.json(user)
        }
    } catch(err) {
        res.status(500).send({ message: 'Error retrieving user' })
    }
}

const authenticate = async(req: Request, res: Response) => {
    try {
        const user = await userStore.authenticate(req.body.username, req.body.user_password)
        if(!user) {
            res.status(401).send({ message: 'Authentication failed' })
        } else {
            const token = jwt.sign({user: user}, process.env.TOKEN_SECRET as string)
            res.json(token)
        }
    } catch(err) {
        res.status(500).send({ message: 'Error authenticating user', error: err})
    }
}


const usersRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', verifyAuthToken, create)
    app.post('/users/authenticate', authenticate )
}

export default usersRoutes