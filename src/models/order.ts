import Client from "../database";

export type Order = {
    id?: number;
    status: 'active' | 'complete';
    user_id: number;
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

    async showCurrent(userId: number): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=$1 AND status=$2'
            const result = await conn.query(sql, [userId, "active"])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find current order. Error: ${err}`)
        }
    }

    async showComplete(userId: number): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=$1 AND status=$2'
            const result = await conn.query(sql, [userId, "complete"])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not find completed orders. Error: ${err}`)
        }
    }

    
}