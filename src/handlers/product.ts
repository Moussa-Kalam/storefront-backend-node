import express, { Request, Response } from 'express'
import verifyAuthToken from '../middlewares/verifyAuthToken'
import { Product, ProductStore } from '../models/product'

const store = new ProductStore()

const index = async(_req: Request, res: Response) => {
    try{
        const products = await store.index()
        res.json(products)
    } catch(err) {
        res.status(400).send({ message: 'Error retrieving products' })
    }
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
        res.status(400).send({ message: 'Error creating product', error: err })
    }
}

const show = async(req: Request, res: Response) => {
    try {
        const product = await store.show(Number(req.params.id))
        if (!product) {
            res.status(404).send({ message: 'Product not found' })
        } else {
            res.json(product)
        }
    } catch(err) {
        res.status(400).send({ message: 'Error retrieving product' })
    }
}


const productsRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
}

export default productsRoutes