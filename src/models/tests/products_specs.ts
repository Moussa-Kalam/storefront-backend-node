import { ProductStore } from '../product'

const productStore = new ProductStore()


describe('Product Store', () => {


    it('create method should add a product', async() => {
        const p = {
            name: 'Toshiba Laptop',
            price: 750.00,
        }
        const result = await productStore.create(p);
        expect(result.name).toBe(p.name);
        expect(Number(result.price)).toEqual(p.price)
    });

    it('index method should return a list of products', async() => {
        const result = await productStore.index();
        expect(result[0].name).toBe('Toshiba Laptop');
    });

    it('show method should return the correct product', async() => {
        const productList = await productStore.index()
        const productId = productList[0].id
        const result = await productStore.show(productId as number);
        expect(result.name).toBe('Toshiba Laptop')
    })
    
});

