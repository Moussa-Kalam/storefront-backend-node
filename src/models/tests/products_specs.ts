import { ProductStore } from '../product'

const productStore = new ProductStore()


describe('Product Store', () => {


    it('create method should add a product', async() => {
        const p = {
            name: 'Toshiba Laptop',
            price: 750.00,
        }
        const result = await productStore.create(p);
        expect(result).toEqual({
            id: 1, 
            name: 'Toshiba Laptop',
            price: 750.00
        });
    })

    it('index method should return a list of products', async() => {
        const result = await productStore.index();
        expect(result).toEqual([{
            id: 1, 
            name: 'Toshiba Laptop',
            price: 750.00
        }]);
    });

    it('show method should return the correct product', async() => {
        const result = await productStore.show(1);
        expect(result).toEqual({
            id: 1, 
            name: 'Toshiba Laptop',
            price: 750.00
        })
    })

    
});

