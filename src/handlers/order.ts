import express, { Request, Response } from 'express'
import { Order, OrderModel } from '../models/order'

const order = new OrderModel()

const index = async(_req: Request, res: Response) => {
    const orders = await order.index()
    res.json(orders)
}

const create = async(req: Request, res: Response) => {
    try {
        const ord: Order = {
            status: req.body.status,
            user_id: req.body.user_id,
        }

        const newOrder = await order.create(ord)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const show = async(req: Request, res: Response) => {
    const ord = await order.show(Number(req.params.id))
    res.json(ord)
}

const showCurrent = async(req: Request, res: Response) => {
    const ord = await order.showCurrent(Number(req.params.id))
    res.json(ord)
}

const update = async(req: Request, res:Response) => {
    try {
        const ordId = Number(req.params.id)
        const orderToUpdate: Order = {
            id: ordId,
            status: req.body.status,
            user_id: req.body.user_id
        }

        const updatedOrder = await order.update(orderToUpdate)
        res.json(updatedOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async(req: Request, res: Response) => {
    const deletedOrder = await order.delete(Number(req.body.id))
    res.json(deletedOrder)
}

const ordersRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.get('orders/:id/current', showCurrent)
    app.post('/orders', create)
    app.put('/orders/:id', update)
    app.delete('/orders/:id', destroy)
}

export default ordersRoutes