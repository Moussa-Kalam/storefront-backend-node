import express, { Request, Response } from 'express'
import verifyAuthToken from '../middlewares/verifyAuthToken'
import { Order, OrderModel } from '../models/order'
import { ProductStore } from '../models/product'

const order = new OrderModel()
const product = new ProductStore()

const create = async(req: Request, res: Response) => {
    try {
        const o: Order = {
            status: req.body.status,
            user_id: req.body.user_id,
        }
        const ord = await order.create(o)
        res.json(ord)
    } catch(err) {
        res.status(400).send({ message: 'Error making the order', error: err})
    }
}

const addProductToOrder = async (req: Request, res: Response) => {
    try {
        const orderId = Number(req.params.orderId)
        const productId = Number(req.params.productId)
        const quantity = req.body.quantity
        const ordPro = {
            order_id: orderId,
            product_id: productId,
            quantity: quantity,
        }
        const existingProduct = await product.show(productId);
        if(!existingProduct) {
            res.status(404).send({ message: 'Product not found' })
        }
        const result = await order.addProductToOrder(ordPro)
        res.json(result)
    } catch (err) {
        res.status(400).send({ message: 'Error adding product to order', error: err})
    }
}

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
    app.post('/orders', verifyAuthToken, create)
    app.post('/orders/:orderId/products/:productId', verifyAuthToken, addProductToOrder)
}


export default ordersRoutes