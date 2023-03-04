import express, { Request, Response } from 'express'
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

const update = async(req: Request, res:Response) => {
    try {
        const productId = Number(req.params.id)
        const productToUpdate: Product = {
            id: productId,
            name: req.body.name,
            price: req.body.price
        }

        const updatedProduct = await store.update(productToUpdate)
        res.json(updatedProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async(req: Request, res: Response) => {
    const deletedProduct = await store.delete(Number(req.body.id))
    res.json(deletedProduct)
}

const productsRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
    app.put('/products/:id', update)
    app.delete('/products/:id', destroy)
}

export default productsRoutes