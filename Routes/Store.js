const express = require('express');
const router = express.Router();
const ProductsService = require('../Services/ProductsService');
const ProductsServiceInstance = new ProductsService();

module.exports = (app) => {
    app.use('/store', router);

    router.get('/products', async (req, res, done) => {
        try {
            const productsList = await ProductsServiceInstance.getProductsList();
         return   res.status(200).send(productsList);
            
        } catch (error) {
            error = 'Something Went Wrong';
            done(error);
        }
    });

    router.post('/products', async (req, res, done) => {
        try {
            const {data} = req.body
            const newProduct = ProductsServiceInstance.create(data);
             res.status(200).send(newProduct)
            done();
        } catch (error) {
            error = "Error Adding Product"

        }
    });

    router.put('/products/:productName', async (req, res, done) => {
        try {
            const { props } = req.body
            const {productName} = req.params
            const updateProduct = await ProductsServiceInstance.updateProduct({ productName, ...props })
            console.log(updateProduct)
             res.status(200).send(updateProduct)
        } catch (error) {
            error = 'Error Updating Product';
            done(error);
            
        }
    });

    router.get('/products/:productId', async (req, res, done) => {
        try {
            const { productName } = req.params.productName;
            const getProduct = await ProductsServiceInstance.getProduct(productName);
            req.params.productId = getProduct.Id;
            res.status(200).send(getProduct);
        } catch (error) {
            error = 'Product Not Found'
            done(error);
        }
    });

    router.post('/vendors', async (req, res, done) => {
        try {
            const data = req.body
            const newVendor = ProductsServiceInstance.createVendor(data);
            return res.status(200).send(newVendor)

        } catch (error) {
            error = "Error Adding Product"

        }
    });

    router.get('/vendors/:vendorName', async (req, res, done) => {
        try {
            const{vendorName}= req.params
            const vendor = await ProductsServiceInstance.getVendor(vendorName);
            return res.status(200).send(vendor);

        } catch (error) {
            error = 'Something Went Wrong';
            done(error);
        }
    });
}