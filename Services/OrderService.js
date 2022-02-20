
const orderModel = require('../Models/Orders');
const orderModelInstance = new orderModel();
const cartModel = require('../Models/Cart');
const OrderItems = require('../Models/OrderItems');
const cartModelInstance = new cartModel();



module.exports = class OrderService {

    async create(data) {
        const { userId } = data;

        try {

            // Instantiate new order and save
            const Order = new orderModel();
            const order = await Order.create({ userId, total });

            return order;

        } catch (err) {
            throw err;
        }

    };

    async findUserOrders(userID) {

        let userOrders = []
        const userOrder = await orderModelInstance.getUserOrder(userID);
        const orders = userOrder.map(order => userOrders.push(order));
        return orders;
    }

    async updateOrder(userID) {

        const order = await orderModelInstance.getUserOrder(userID);

        const updateOrder = await orderModelInstance.updateOrder(order);


        return updateOrder;


    }

};


