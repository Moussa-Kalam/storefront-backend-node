import Client from "../database";
import bcrypt from 'bcrypt'

const saltRounds = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS): 10
const pepper = process.env.BCRYPT_PASSWORD

export type User = {
    id?: number;
    username: string;
    first_name: string;
    last_name: string;
    user_password: string
}

export class UserModel {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT id, username, first_name, last_name FROM users'
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
            const sql = 'INSERT INTO users (username, first_name, last_name, user_password) VALUES ($1, $2, $3, $4) RETURNING username, first_name, last_name'
            
            const hash = bcrypt.hashSync(u.user_password + pepper, saltRounds);
            
            const result = await conn.query(sql, [
                u.username,
                u.first_name,
                u.last_name,
                hash
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
            const sql = 'SELECT username, first_name, last_name FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
            const conn = await Client.connect()
            const sql = 'SELECT user_password FROM users WHERE username=($1)'

            const result = await conn.query(sql, [username])
            console.log(password+pepper)

            if(result.rows.length) {
                const user = result.rows[0]
                console.log(user)

                if(bcrypt.compareSync(password+pepper, user.user_password)) {
                    return user
                }
            }

            return null
        }
}