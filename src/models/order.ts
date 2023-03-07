import Client from "../database";

export type Order = {
    id?: number;
    status: string;
    user_id: number;
}

export class OrderModel {
    async showCurrent(userId: number): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=$1 AND status=$2'
            const result = await conn.query(sql, [userId, "active"])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${userId}. Error: ${err}`)
        }
    }

    
}