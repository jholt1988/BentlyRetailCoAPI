const ProductsModel = require('../Models/Products');
const ProductModelInstance = new ProductsModel();

module.exports = class ProductsService {
    async create(data) {
        try {
            const newProduct = await ProductModelInstance.create(data);
            return newProduct
        } catch (err) {
            throw new Error('Product Not Added')
        }
    }

    async getProductsList() {
        try {
            const ProductsList = await ProductModelInstance.getAll();
            return ProductsList
        } catch (err) {
            throw new Error('Something Went Wrong!');
        }
    };

    async getProduct(productName) {
        try {
            const product = await ProductModelInstance.getOne(productName);
            return product; 
        } catch (error) {
            throw new Error('Something Went Wrong!');
        }
    };

    async updateProduct(data) {
        try {
            const { productName, ...product } = data;
            const getProduct = await ProductModelInstance.getOne(productName);
            const updateProduct = await ProductModelInstance.update({ product: getProduct, ...product });
            return updateProduct;
        } catch (error) {
            throw new Error('Error Updating Product Record');
        }
    }

    async getVendor(vendorName) {
        try {
            const vendor = await ProductModelInstance.getOneVendor(vendorName);
            return vendor;
        } catch (error) {
            throw new Error('Something Went Wrong!');
        }
    };

    async createVendor(data) {
        try {
            const createVendor = await ProductModelInstance.createVendor(data);
            return createVendor;
        } catch (err) {
            throw new Error(err);
        }
    }
}