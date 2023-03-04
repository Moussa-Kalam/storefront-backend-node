import Client from "../database";

export type Order = {
    id?: number;
    status: string;
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
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const conn = await Client.connect()
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

    async show(id: number): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
    }

    async showCurrent(userId: number): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=$1 AND status=ACTIVE'
            const result = await conn.query(sql, [userId])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${userId}. Error: ${err}`)
        }
    }

    async update(o: Order): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = 'UPDATE orders SET user_id=$2, status=$3 WHERE id=$1'
            const result = await conn.query(sql, [
                o.id,
                o.status,
                o.user_id
            ])
            conn.release()
             return result.rows[0]
        } catch (err) {
            throw new Error(`Could not update order. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = 'DELETE FROM orders WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }
}