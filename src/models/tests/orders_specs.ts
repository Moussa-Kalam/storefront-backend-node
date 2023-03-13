import { Order, OrderModel } from "../order";
import { User, UserModel } from "../user";
import { ProductStore } from "../product";
// import supertest from "supertest";
// import app from "../../server";

const order = new OrderModel()
const user = new UserModel()
const product = new ProductStore()
let userId: number = 0;
let productId: number = 0;
let orderId: number = 0;

describe('Order Model', () => {
    beforeAll( async ()=>{
        // create user
        const newUser = {
            username: 'Gox',
            first_name: 'Paul',
            last_name: 'Bool',
            password: 'pawd'
        };
        const user_response: User = await user.create(newUser);
        userId = user_response.id as number;

        // create product
        const newProduct = {
            name: 'Perfume',
            price: 135.75
        };

        const product_response = await product.create(newProduct)
        productId = product_response.id as number
    });


    it('should have a showCurrent method', () => {
        expect(order.showCurrent).toBeDefined();
    })

    it('should have a create method', () => {
        expect(order.create).toBeDefined();
    })

    it('create method should add an order', async() => {
        const o: Order = {
            status: 'active',
            user_id: userId
        }
        const result = await order.create(o);
        orderId = result.id as number
        expect(result.status).toBe('active');
        expect(Number(result.user_id)).toEqual(userId)
    });

    it('addProductToOrder method should a product to an order', async() => {
        const ordPro = {
            order_id: orderId,
            product_id: productId,
            quantity: 1
        }
        const result = await order.addProductToOrder(ordPro) 
        expect(Number(result.order_id)).toBe(orderId)
        expect(Number(result.product_id)).toBe(productId)
        expect(result.quantity).toBe(1)
    })

    it('showCurrent method should return the current order or undefined', async () => {
        // Try to get the current order for a user with no active orders
        const result = await order.showCurrent(userId);
        expect(result.status).toEqual('active');
    });

    afterAll(async() => {
       await order.delete(orderId);

    })

});
