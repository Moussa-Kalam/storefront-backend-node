import { OrderModel } from "../order";

const order = new OrderModel()


describe('Order Model', () => {


    it('create method should add a order', async() => {
        const ord = {
            status: 'ACTIVE',
            user_id: 1
        }
        const result = await order.create(ord);
        expect(result.status).toBe('ACTIVE');
    })

    it('index method should return a list of orders', async() => {
        const result = await order.index();
        expect(result[0].status).toBe('COMPLETED');
    });

    it('show method should return the correct order', async() => {
        const result = await order.show(3);
        expect(result.id).toBe(3)
        expect(result.status).toBe('ACTIVE')
    })

    it('update method should update a specific order', async() => {
        const ordersList = await order.index()
        const orderId = Number(ordersList[0].id) 
        const ord = {
            id: orderId,
            user_id: 1,
            status: 'COMPLETED'
        }
        const result = await order.update(ord)
        expect(result.status).toBe('COMPLETED')
    })

    it('delete method should remove the specified order', async() => {
     order.delete(1);
        const result = await order.index();

        expect(result).toEqual([]);
    });

});
