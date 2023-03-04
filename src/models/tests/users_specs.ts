import { UserModel } from "../user";

const user = new UserModel()


describe('User Model', () => {


    it('create method should add a user', async() => {
        const u = {
            user_name: 'Shooter',
            first_name: 'Moussa',
            last_name: 'AMZAT',
            user_password: 'Mypassword',
        }
        const result = await user.create(u);
        expect(result).toEqual({
            id: 1, 
            user_name: 'Shooter',
            first_name: 'Moussa',
            last_name: 'AMZAT',
            user_password: 'Mypassword',
        });
    })

    it('index method should return a list of users', async() => {
        const result = await user.index();
        expect(result).toEqual([{
            user_name: 'Shooter',
            first_name: 'Moussa',
            last_name: 'AMZAT',
            user_password: 'Mypassword',
        }]);
    });

    it('show method should return the correct user', async() => {
        const result = await user.show(1);
        expect(result).toEqual({
            id: 1, 
            user_name: 'Shooter',
            first_name: 'Moussa',
            last_name: 'AMZAT',
            user_password: 'Mypassword',
        })
    })

    it('update method should update a specific user', async() => {
        const usersList = await user.index()
        const userId = Number(usersList[0].id) 
        const u = {
            id: userId,
            user_name: 'Sniper',
            first_name: 'Moussa',
            last_name: 'ADAMOU',
            user_password: 'Mypassword'
        }
        const result = await user.update(u)
        expect(result.user_name).toBe(u.user_name)
        expect(result.last_name).toBe(u.last_name)
    })

    it('delete method should remove the specified user', async() => {
        user.delete(1);
        const result = await user.index();

        expect(result).toEqual([]);
    });

});
