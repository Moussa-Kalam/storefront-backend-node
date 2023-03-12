import supertest from 'supertest'
import app from '../../server'

const request = supertest(app);
describe('Test product endpoints', () => {
let token: string;

    beforeAll(async() => {
        const response = await request.post('/users/authenticate').send({
            username: 'dev',
            password: 'Mypassword'
        })
        token = response.body;
    })

    it('gets the index endpoint ', async() => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    })

    it('gets the show endpoint ', async() => {
        const response = await request.get('/products/1');
        expect(response.status).toBe(200);
    })

    it('gets the create endpoint ', async() => {
        const response = await request
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
            "name": "Watch",
            "price": 50.00
        });
        expect(response.status).toBe(200);
    })
})