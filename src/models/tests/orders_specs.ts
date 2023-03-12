import { OrderModel } from "../order";

const order = new OrderModel()


describe('Order Model', () => {
    it('should have a showCurrent method', () => {
        expect(order.showCurrent).toBeDefined();
    })

    it('showCurrent method should return the current order or undefined', async () => {
        // Try to get the current order for a user with no active orders
        const result = await order.showCurrent(2);
        expect(result).toBeUndefined();
    });
});
