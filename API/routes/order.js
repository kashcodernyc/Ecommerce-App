const router = require('express').Router();
const Order = require('../models/Order');

const {
    verifyToken,
    tokenAuthorization,
    verifyTokenAdmin
} = require('./verifyToken');

// Create Order
router.post('/', verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).send(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Update Order
router.put('/:id', verifyTokenAdmin, async (req, res) => {
    try {
        // update the cart by using the cart id 
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            // this will accept the updated cart and store it in the database
            new: true
        })

        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Delete the Order
// Only authorized user can delete order
router.delete('/:id', tokenAuthorization, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json('The Order has been deleted!')
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get User Order
// The id has to be users id
router.get('/find/:userId', tokenAuthorization, async (req, res) => {
    try {
        const orders = await Order.findOne({
            userId: req.params.id
        })
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get All Orderss
// Only admin can access this
router.get('/', verifyTokenAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get Monthly Sales Report
router.get('/income', verifyTokenAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        // aggregate the data
        const income = await Order.aggregate[{
            // $match takes a document that specifies the query conditions
            // only gets sales created 2 month prior to the latest order
            $match: {
                createdAt: {
                    $gte: previousMonth
                }
            }
        }, {
            // $project is used to pass along the documents with the requested fields to the next stage in the pipeline.
            $project: {
                month: {
                    $month: '$createdAt'
                },
                sales: $amount
            },
            // $group is used to group input documents by the specified _id expression and for each distinct grouping, outputs a document
            $group: {
                _id: '$month',
                total: {
                    $sum: $sales
                }
            }

        }]
        res.status(200).json(income)
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;