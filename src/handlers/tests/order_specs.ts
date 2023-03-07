import supertest from 'supertest'
import app from '../../server'

const request = supertest(app);
describe('Test orders endpoint', () => {
    it('gets the current order endpoint ', async() => {
        const response = await request.get('current-order/1');
        expect(response.status).toBe(200);
    })
})
