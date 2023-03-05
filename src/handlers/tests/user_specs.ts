import supertest from 'supertest'
import app from '../../server'

const request = supertest(app);
describe('Test users endpoints', () => {
    it('gets the index endpoint ', async() => {
        const response = await request.get('/users');
        expect(response.status).toBe(200);
    })

    it('gets the show endpoint ', async() => {
        const response = await request.get('/users/1');
        expect(response.status).toBe(200);
    })

    it('gets the create endpoint ', async() => {
        const response = await request.post('/users').send({
            "user_name": "Shooter", 
            "first_name": "Pablo",
            "last_name": "Razingo",
            "user_password": "pass@"
        });
        expect(response.status).toBe(200);
    })

    it('gets the authentication endpoint ', async() => {
        const response = await request.post('/users/authenticate').send({
            user_name: "Pablo",
            user_password: "pass@"
        });
        expect(response.status).toBe(200);
    })


})