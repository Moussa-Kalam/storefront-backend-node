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

    it('gets the current order endpoint ', async() => {
        const response = await request
            .get('/current-order/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    })
})
