import supertest from 'supertest'
import app from '../../server'
import { Product, ProductStore } from '../../models/product';
import { Order, OrderModel } from '../../models/order';
import { User, UserModel } from '../../models/user';
const request = supertest(app);

const user = new UserModel()
const product = new ProductStore()
const order = new OrderModel()
let userId = 0;
let productId = 0;
let orderId = 0;


describe('Test orders endpoint', () => {

    let token: string;

    beforeAll(async() => {
        const newUser = {
            username: 'Gox',
            first_name: 'Paul',
            last_name: 'Bool',
            password: 'pawd'
        };
        const user_response: User = await user.create(newUser);
        userId = user_response.id as number;

        // create product
        const newProduct = {
            name: 'Perfume',
            price: 135.75
        };
        const product_response = await product.create(newProduct)
        productId = product_response.id as number


        const newOrder: Order = {
            status: 'active',
            user_id: userId
        }
        const order_response = await order.create(newOrder)
        orderId = order_response.id as number


        const response = await request.post('/users/authenticate').send({
            username: 'Gox',
            password: 'pawd'
        })
        token = response.body;
    })

    it('gets the addProductToOrder endpoint', async() => {
        const response = await request 
            .post(`/orders/${orderId}/products/${productId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                quantity: 2
            });
            expect(response.status).toBe(200);
    })

    it('gets the create order endpoint', async() => {
        const response = await request
            .post('/orders')
            .set('Authorization', `Bearer ${token}`)
            .send({
                status: 'active',
                user_id: 1
            });
            expect(response.status).toBe(200);
    })

    it('gets the current order endpoint', async() => {
        const response = await request
            .get('/current-order/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    })

    afterAll(async() => {
       await order.delete(orderId)
    })
})
