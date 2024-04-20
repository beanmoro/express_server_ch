import express from 'express';
import path from 'path';
import { ProductManager} from './product_manager.js';

const __dirname = import.meta.dirname;
const app = express();
const PORT = 8080;
const pManager = new ProductManager(path.join(__dirname+'/data/products.json'));


app.get('/products', async (req, res)=>{

    try {
        const { limit } = req.query;
        let products = await pManager.getProducts();
        if (limit){
            products = products.slice(0, limit);
        }
        res.json({
            limit: limit,
            products: products
        });
    } catch (error) {
        res.json({
            error: error
        })
    }

})


app.get('/products/:pid', async (req, res) => {

    try {
        const {pid} = req.params;
    
        const product = await pManager.getProductById(parseInt(pid));
        res.status(200).json({
            product: product   
        });
    } catch (error) {
        res.status(404).json({
            status_code: 404,
            error: error.message
        })
    }


});


app.listen(PORT, () =>{
    console.log(`Server listening on https://localhost:${PORT}`);
})