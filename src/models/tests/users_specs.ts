import { User, UserModel } from "../user";

const user = new UserModel()


describe('User Model', () => {
    it('should have a create method', () => {
        expect(user.create).toBeDefined()
    })

    it('should have an index method', () => {
        expect(user.index).toBeDefined()
    })

    it('should have a show method', () => {
        expect(user.show).toBeDefined()
    })

    it('create method should add a user', async() => {
        const u: User = {
            username: 'dev',
            first_name: 'Moussa',
            last_name: 'AMZAT',
            password: 'Mypassword',
        }
        const result = await user.create(u);
        expect(result.username).toBe('dev');
    })

    it('index method should return a list of users', async() => {
        const result = await user.index();
        expect(result).toBeTruthy;
    });

    it('show method should return the correct user', async() => {
        const usersList = await user.index()
        const userId = Number(usersList[0].id);
        const result = await user.show(userId)
        expect(result.username).toBeTruthy();
    })

});
