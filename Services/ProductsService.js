const ProductsModel = require('../Models/Products');
const ProductModelInstance = new ProductsModel();

module.exports = class ProductsService {
    async create(data) {
        try {
            const newProduct = await ProductModelInstance.create(data);
            console.log(newProduct)
            if (!newProduct) {
                throw new Error('Product Not Added')
            }
            return newProduct
        } catch (err) {
            throw new Error('err')
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
              const {productName, ...props} = data
            
                const updateProduct = await ProductModelInstance.update({ productName:productName, ...props })
                return updateProduct
            
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