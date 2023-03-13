import supertest from 'supertest'
import app from '../../server'
import { User, UserModel } from '../../models/user';

const request = supertest(app);

describe('Test users endpoints', () => {
    let token: string;
    const newUser : User= {
        username: 'Gox',
        first_name: 'Paul',
        last_name: 'Bool',
        password: 'pawd'
    };

    beforeAll(async() => {
        const response = await request.post('/users/authenticate').send({
            username: 'Gox',
            password: 'pawd'
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
        const response = await request.post('/users').send(newUser)
        expect(response.status).toBe(200); 
    })

})