import { ProductStore } from '../product'

const productStore = new ProductStore()


describe('Product Store', () => {
    it('should have a create method', () => {
        expect(productStore.create).toBeDefined()
    })

    it('should have an index method', () => {
        expect(productStore.index).toBeDefined()
    })

    it('should have a show method', () => {
        expect(productStore.show).toBeDefined()
    })

    it('create method should add a product', async() => {
        const p = {
            name: 'Watch',
            price: 50.00,
        }
        const result = await productStore.create(p);
        expect(result.name).toBe(p.name);
        expect(Number(result.price)).toEqual(p.price)
    });

    it('index method should return a list of products', async() => {
        const result = await productStore.index();
        expect(result[0].name).toBe('Watch');
    });

    it('show method should return the correct product', async() => {
        const productList = await productStore.index()
        const productId = productList[0].id
        const result = await productStore.show(productId as number);
        expect(result.name).toBe('Watch')
    })
    
});

