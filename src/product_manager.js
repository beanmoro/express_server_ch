import fs from 'fs';


export class ProductManager {
    #path;

    constructor(path){
        this.#path = path;
    }

    async init(){
        await fs.promises.writeFile(this.#path, '[]');
    }

    async addProduct( product){
        if('id' in product){
            return;
        }
        const productsFile = await fs.promises.readFile(this.#path, 'utf-8');
        const productsArray = JSON.parse(productsFile);
        product.id = productsArray.length;
        productsArray.push(product);

        await fs.promises.writeFile(this.#path, JSON.stringify(productsArray));
    }

    async getProducts(){
        try {
            const productsFile = await fs.promises.readFile(this.#path, 'utf-8');
            const productsArray = JSON.parse(productsFile);
            return productsArray;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id){

        try {
            const productsFile = await fs.promises.readFile(this.#path, 'utf-8');
            const productsArray = JSON.parse(productsFile);
            const product = productsArray.find(e => e.id === id);
            if (!product){
                throw new Error('Product not found!');
            }
            return product;
        } catch (error) {
            throw error;
        }

    }

    async updateProduct(id, product){
        product.id = id;
        const productsFile = await fs.promises.readFile(this.#path, 'utf-8');
        const productsArray = JSON.parse(productsFile);
        productsArray.forEach(e => {

            if(e.id == id){
                Object.assign(e, product);
            }
        });
        await fs.promises.writeFile(this.#path, JSON.stringify(productsArray));
    }

    async deleteProduct(id){
        const productsFile = await fs.promises.readFile(this.#path, 'utf-8');
        const productsArray = JSON.parse(productsFile);
        const index = productsArray.findIndex(e => e.id === id);
        if (index !== -1){
            productsArray.splice(index, 1);
        }
        await fs.promises.writeFile(this.#path, JSON.stringify(productsArray));
    }
};



// const main = async () => {
//     const pManager = new ProductManager('./products.json');

//     console.log( await pManager.getProducts())
//     await pManager.addProduct({title: "producto prueba", description: "Este es un producto prueba", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25});
//     console.log( await pManager.getProducts())
//     console.log( await pManager.getProductById(0))
//     await pManager.updateProduct(22, {code: 'caca'});
//     console.log( await pManager.getProducts())
//     await pManager.deleteProduct(22);
//     console.log( await pManager.getProducts())
// }

// main();