import supertest from 'supertest'
import app from '../../server'

const request = supertest(app);
describe('Test orders endpoint', () => {

    let token: string;

    beforeAll(async() => {
        const response = await request.post('/users/authenticate').send({
            username: 'dev',
            password: 'Mypassword'
        })
        token = response.body;
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

    it('gets the addProductToOrder endpoint', async() => {
        const response = await request 
            .post('/orders/1/products/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                product_id: 1,
                quantity: 1
            });
            expect(response.status).toBe(200);
    })
    it('gets the current order endpoint', async() => {
        const response = await request
            .get('/current-order/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    })
})
