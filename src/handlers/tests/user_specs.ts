import supertest from 'supertest'
import app from '../../server'

const request = supertest(app);

describe('Test users endpoints', () => {
    let token: string;

    beforeAll(async() => {
        const response = await request.post('/users/authenticate').send({
            username: 'dev',
            password: 'Mypassword'
        })
        token = response.body;
    })

    it('gets the index endpoint ', async() => {
        const response = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    })

    it('gets the show endpoint ', async() => {
        const response = await request
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    })

    it('gets the create endpoint ', async() => {
        const response = await request.post('/users').send({
            username: 'dev', 
            first_name: 'Moussa',
            last_name: 'AMZAT',
            password: 'Mypassword'
        });
        expect(response.status).toBe(200); 
    })

})