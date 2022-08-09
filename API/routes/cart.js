const router = require('express').Router();
const Cart = require('../models/Cart');

const {
    verifyToken,
    tokenAuthorization,
    verifyTokenAdmin
} = require('./verifyToken');

// Add to cart
router.post('/', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).send(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Update a Cart
router.put('/:id', verifyToken, async (req, res) => {
    try {
        // update the cart by using the cart id 
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            // this will accept the updated cart and store it in the database
            new: true
        })

        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Delete the Cart
// Only authorized user can delete cart
router.delete('/:id', tokenAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json('The Cart has been deleted!')
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get User Cart
// The id has to be users id
router.get('/find/:userId', tokenAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({
            userId: req.params.id
        })
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get All Carts
// Only admin can access this
router.get('/', verifyTokenAdmin, async (req, res) => {
    try {
        const cart = await Cart.find()
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;