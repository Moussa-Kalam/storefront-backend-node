import supertest from 'supertest'
import app from '../../server'
import { Product, ProductStore } from '../../models/product';
import { User, UserModel } from '../../models/user';

const request = supertest(app);
const user = new UserModel()
const product = new ProductStore()

let userId: number = 0;
let productId: number = 0;
let token: string;

describe('Test product endpoints', () => {

    beforeAll(async() => {
        const newUser = {
            username: 'Gox',
            first_name: 'Paul',
            last_name: 'Bool',
            password: 'pawd'
        };
        const user_response: User = await user.create(newUser);
        userId = user_response.id as number;

        const newProduct = {
            name: 'Perfume',
            price: 135.75
        }
        const product_response: Product = await product.create(newProduct)
        productId = product_response.id as number

        const response = await request.post('/users/authenticate').send({
            username: 'Gox',
            password: 'pawd'
        })
        token = response.body;
    })

    it('gets the index endpoint ', async() => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    })

    it('gets the show endpoint ', async() => {
        const response = await request.get(`/products/${productId}`);
        expect(response.status).toBe(200);
    })

    it('gets the create endpoint ', async() => {
        const response = await request
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Perfume',
                price: 135.75
            });
        expect(response.status).toBe(200);
    })
})