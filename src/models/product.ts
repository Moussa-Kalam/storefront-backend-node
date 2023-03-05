import Client from "../database";

export type Product = {
    id?: number;
    name: string;
    price: number;
} 

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get products. Error ${err}`)
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *'
            const result = await conn.query(sql, [
                p.name,
                p.price
            ])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
        }
    }

    async show(id: number): Promise<Product> {
        try{
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: $(err)`)
        }
    }

    async update(p: Product): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = 'UPDATE products SET name=$2, price=$3 WHERE id=$1 RETURNING *'
            const result = await conn.query(sql, [
                p.id,
                p.name,
                p.price
            ])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not update product ${p.id}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = 'DELETE FROM products WHERE id=$1'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }
}


