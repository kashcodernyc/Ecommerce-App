const router = require('express').Router();
const Product = require('../models/Product');

const {
    verifyTokenAdmin,
} = require('./verifyToken');

// Create a new product
router.post('/', verifyTokenAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).send(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Update a product
router.put('/:id', verifyTokenAdmin, async (req, res) => {
    try {
        // update the user by using the user id and uning the information in the boxy
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            // this will accept the updated user and store it in the database
            new: true
        })

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Delete the Product
router.delete('/:id', verifyTokenAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('The product has been deleted!')
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get Product
router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get all products 
router.get('/', async (req, res) => {
    const queryNew = req.query.new;
    const queryCategory = req.query.category;


    try {
        let products;
        // displays new product first and old products last
        if (queryNew) {
            products = await Product.find().sort({
                createdAt: -1
            }).limit(1)
            // displays product based on the categories
        } else if (queryCategory) {
            products = await Product.find({
                categories: {
                    $in: [queryCategory]
                }
            })
        } else {
            products = await Product.find()
        }
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;