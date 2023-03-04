import Client from "../database";

export type OrderItem = {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
}

export class OrderItemModel {
    async create(oi: OrderItem): Promise<OrderItem> {
        try {
            const conn = await Client.connect()
            const sql = 'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [
                oi.order_id, 
                oi.product_id,
                oi.quantity
            ])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new product in order. Error: ${err}`)
        }
    }
}