import express, { Request, Response } from 'express'
import { User, UserModel } from '../models/user'
import jwt from 'jsonwebtoken'

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

const update = async(req: Request, res:Response) => {
    try {
        const userId = Number(req.params.id)
        const userToUpdate: User = {
            id: userId,
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_password: req.body.user_password,
        }

        const updatedUser = await userStore.update(userToUpdate)
        res.json(updatedUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async(req: Request, res: Response) => {
    const deletedUser = await userStore.delete(Number(req.body.id))
    res.json(deletedUser)
}

const usersRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
    app.put('/users/:id', update)
    app.delete('/users/:id', destroy)
}

export default usersRoutes