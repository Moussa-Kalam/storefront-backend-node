import Client from "../database";

export type Order = {
    id?: number;
    status: 'active' | 'complete';
    user_id: number;
}

export type OrderProduct = {
    id?: number,
    order_id: number,
    product_id: number,
    quantity: number
}
export class OrderModel {

    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not retrieve list of orders. Error: ${err}`)
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const conn = await Client.connect()
            const user = await conn.query('SELECT * FROM users WHERE id = $1', [o.user_id])
            if (user.rows.length === 0) {
                throw new Error(`User with id ${o.user_id} does not exist`)
            }
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *'
            const result = await conn.query(sql, [
                o.status,
                o.user_id
            ])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`)
        }
    }

    async addProductToOrder(op: OrderProduct): Promise<OrderProduct> {
        try {
            const conn = await Client.connect()
            const sql = 'INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [
                op.order_id,
                op.product_id,
                op.quantity
            ])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add a product to an order. Error ${err}`)
        }
    }

    async showCurrent(userId: number): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=$1 AND status=\'active\''
            const result = await conn.query(sql, [userId])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find current order of user ${userId}. Error: ${err}`)
        }
    }

    async showComplete(userId: number): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=$1 AND status=\'complete\''
            const result = await conn.query(sql, [userId])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not find completed orders of user ${userId}. Error: ${err}`)
        }
    }

    async delete(orderId: number): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = 'DELETE FROM orders WHERE id=($1)'
            const result = await conn.query(sql, [orderId])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not delete order ${orderId}. Error: ${err}`)
        }
    }
}