import { OrderItem, OrderItemModel } from "../order-item";

const orderItem = new OrderItemModel()

it('create method should add product to an order', async() => { 
    const ord = {
        quantity: 3,
        order_id: 1,
        product_id: 1
    }
    const result = await orderItem.create(ord)
    expect(result.quantity).toBe(3)
    expect(result.order_id).toBe(1)
    expect(result.product_id).toBe(1)
})