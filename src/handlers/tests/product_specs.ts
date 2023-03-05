import supertest from 'supertest'
import app from '../../server'

const request = supertest(app);
describe('Test product endpoints', () => {
    it('gets the index endpoint ', async() => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    })

    it('gets the show endpoint ', async() => {
        const response = await request.get('/products/1');
        expect(response.status).toBe(200);
    })

    it('gets the create endpoint ', async() => {
        const response = await request.post('/products').send({
            "name": "Corn Flakes",
            "price": 20.25
        });
        expect(response.status).toBe(200);
    })
})