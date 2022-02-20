
const CartModel = require('../Models/Cart');
const CartItemModel = require('../Models/CartItem');
const ModelCart = new CartModel();
const cartItemModelInstance = new CartItemModel();
const moment = require('moment');
const OrderModel = require('../Models/Orders');
const userModel = require('../models/user');
const userModelInstance = new userModel();

module.exports = class CartService {

    async create(data) {
        try {
           
            //Create Cart
            const Cart = new CartModel();
            const cart = await Cart.create(data);

            if (!cart) {
                throw new Error('Error Creating Cart');
            }

            return cart;
        
        } catch (err) {
            throw (err);
        
        }
    }
    
    async loadCart(userID) {

        try {
            // Load Cart
            const cart = await userModelInstance.loadCartByUser(userID);

            const cartItems = await CartItemModel.getAllCartItems(cart.cartID);
            cartItems.items = cartItems;
            console.log(cart)
            
    
            if (!cart) {
                throw new Error('Error Loading Carts');
            }

            return { cartItems: cartItems };

            
        } catch (err) {
            throw new Error(err);
            
        }

    }
    async addItems(userID, item) {
        

        //Create Cart Item
        try {
           

            const cart = await ModelCart.loadCartByUser(userID);
             
           
            const created = moment.utc();
            const modified = moment.utc();
        
            
            const newCartItem = await CartItemModel.create({ cartID: cart.cartID, created, modified, ...item });
                    
            if (!newCartItem) {
                throw new Error('Error: Item Not Added To Cart');
            }

            return newCartItem;
                
        }
        catch (err) {
            throw Error(err);
        }
    }
            
    async update(data) {
          
        try {
            //UpDate Cart

            const updatedCartItem = await CartItemModel.update(data);

            if (!updatedCartItem) {
                throw new Error('Error!');

            }
        } catch (err) {
            throw new Error(err);
        }
    }

    async checkout(cartID, userID, paymentInfo) {
        //Get Cart ID by User
        const stripe = require('stripe')('sk_test_51KJmHTAjEYOrlpJbcRtNktEFaSBqHxaUsaAcPgjDQojexeyRbcGbKnqGwLIFhD0C7PP6EVUivLLYRdJMC216kzvI00hK4IjFwh');
        const cart = await ModelCart.loadCartByCartID(cartID);
        // Load cart items
        const cartItems = await CartItemModel.getAllCartItems(userID);
        console.log(cartItems)
        // Generate total price from cart items
        const total = cartItems.reduce((total, item) => {
            return total += parseInt(item.productPrice.replace(/[^0-9]/g, ""));
        }, 0);
        console.log(total)

        // Generate initial order
        const Order = new OrderModel({ total, userID , cartID});
        Order.addItems(cartItems);
        await Order.create();

        // Make charge to payment method (not required in this project)

        const customer = await stripe.customers.create({
            description: userModelInstance.firstname,
            email: userModelInstance.email,
            source: 'tok_mastercard'




        })
        
        const charge = await stripe.charges.create({
            amount: total,
            currency:'usd',
            customer: customer.id,
            description: 'Jordan ButtCharge'
        });

        // On successful charge to payment method, update order status to COMPLETE
        const order = Order.updateOrder({ status: 'COMPLETE' });

        return order;

    } catch(err) {
        throw err;
    }
};

