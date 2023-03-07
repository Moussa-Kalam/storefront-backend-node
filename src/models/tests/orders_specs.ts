import { OrderModel } from "../order";

const order = new OrderModel()


describe('Order Model', () => {

    it('show method should return the current order', async() => {
        const result = await order.showCurrent(1);
        expect(result.id).toBe(1)
        expect(result.status).toBe('active')
    })

});
