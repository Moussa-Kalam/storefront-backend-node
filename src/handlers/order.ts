import express, { Request, Response } from 'express'
import verifyAuthToken from '../middlewares/verifyAuthToken'
import { OrderModel } from '../models/order'

const order = new OrderModel()


const showCurrent = async(req: Request, res: Response) => {
    try {
        const ord = await order.showCurrent(parseInt(req.params.id))
        res.json(ord)
    } catch(err) {
        res.status(400).send({ message: 'Error retrieving current order.', error: err})
        res.json(err)
    }
}

const ordersRoutes = (app: express.Application) => {
    app.get('/current-order/:id', verifyAuthToken, showCurrent)
}

export default ordersRoutes