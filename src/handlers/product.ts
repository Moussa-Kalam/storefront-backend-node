import express, { Request, Response } from 'express'
import verifyAuthToken from '../middlewares/verifyAuthToken'
import { Product, ProductStore } from '../models/product'

const store = new ProductStore()

const index = async(_req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const create = async(req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
        }

        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const show = async(req: Request, res: Response) => {
    const product = await store.show(Number(req.params.id))
    res.json(product)
}


const productsRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
}

export default productsRoutes