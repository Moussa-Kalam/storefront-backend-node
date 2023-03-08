import { UserModel } from "../user";

const user = new UserModel()


describe('User Model', () => {


    it('create method should add a user', async() => {
        const u = {
            username: 'dev',
            first_name: 'Moussa',
            last_name: 'AMZAT',
            user_password: 'Mypassword',
        }
        const result = await user.create(u);
        expect(result.username).toBe('dev');
    })

    it('index method should return a list of users', async() => {
        const result = await user.index();
        expect(result[0].username).toBe('dev');
    });

    it('show method should return the correct user', async() => {
        const usersList = await user.index()
        const userId = Number(usersList[0].id);
        const result = await user.show(userId)
        expect(result.username).toBe('dev')
    })

});
