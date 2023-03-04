import Client from "../database";

export type User = {
    id?: number;
    user_name: string;
    first_name: string;
    last_name: string;
    user_password: string
}

export class UserModel {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = 'INSERT INTO users (user_name, first_name, last_name, user_password) VALUES ($1, $2, $3, $4) RETURNING *'
            const result = await conn.query(sql, [
                u.user_name,
                u.first_name,
                u.last_name,
                u.user_password
            ])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`)
        }
    }

    async show(id: number): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }

    async update(u: User): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = 'UPDATE users SET user_name=$2, first_name=$3, last_name= $4, user_password=$5 WHERE id=$1 RETURNING user_name, first_name, last_name'
            const result = await conn.query(sql, [
                u.id,
                u.user_name,
                u.first_name,
                u.last_name,
                u.user_password
            ])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not update user ${u.id}. Error ${err}`)
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = 'DELETE FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }
}