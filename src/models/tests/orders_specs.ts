import { Order, OrderModel } from "../order";

const order = new OrderModel()


describe('Order Model', () => {
    it('should have a showCurrent method', () => {
        expect(order.showCurrent).toBeDefined();
    })

    it('should have a create method', () => {
        expect(order.create).toBeDefined();
    })

    it('create method should add an order', async() => {
        const o: Order = {
            status: 'active',
            user_id: 1
        }
        const result = await order.create(o);
        expect(result.status).toBe('active');
        expect(Number(result.user_id)).toEqual(1)
    });

    it('addProductToOrder method should a product to an order', async() => {
        const ordPro = {
            order_id: 1,
            product_id: 1,
            quantity: 1
        }
        const result = await order.addProductToOrder(ordPro) 
        expect(Number(result.order_id)).toBe(1)
        expect(Number(result.product_id)).toBe(1)
        expect(result.quantity).toBe(1)
    })

    it('showCurrent method should return the current order or undefined', async () => {
        // Try to get the current order for a user with no active orders
        const result = await order.showCurrent(2);
        expect(result).toBeUndefined();
    });
});
