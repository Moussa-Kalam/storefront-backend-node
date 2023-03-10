import { OrderModel } from "../order";

const order = new OrderModel()


describe('Order Model', () => {

    it('showCurrent method should return the current order or undefined', async () => {
        // Try to get the current order for a user with no active orders
        const result = await order.showCurrent(999);
        expect(result).toBeUndefined();

        // Create a new order for the user
        const newOrder = await order.create({ status: 'active', user_id: 1 });
        expect(newOrder).toBeDefined();

        // Try to get the current order for the user with the newly created order
        const currentOrder = await order.showCurrent(1);
        expect(currentOrder.id).toBe(newOrder.id);
        expect(currentOrder.status).toBe('active');
    });
});
