const CryptoJs = require('crypto-js');
const {
    verifyTokenAdmin,
    tokenAuthorization
} = require('./verifyToken');

const User = require('../models/User');
const router = require('express').Router();


// update the user credentials using the id
router.put('/:id', tokenAuthorization, async (req, res) => {
    // if password exist, encrypt the password using the secret password
    if (req.body.password) {
        req.body.password = CryptoJs.AES.encrypt(
            req.body.password,
            process.env.SECRET_PASS
        ).toString();
    }
    try {
        // update the user by using the user id and uning the information in the boxy
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            // this will accept the updated user and store it in the database
            new: true
        })

        res.status(200).json(updatedUser)
    } catch (err) {
        Z
        res.status(500).json(err);
    }
})

// Delete user from the database

router.delete('/:id', tokenAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('The user has been deleted')
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get individual user from the database
router.get('/find/:id', verifyTokenAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const {
            password,
            ...others
        } = user._doc;
        // display all the information of user except for password
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get all users from the database
router.get('/', verifyTokenAdmin, async (req, res) => {
    const query = req.query.new;

    try {
        // return the first 5 users
        const users = query ? await User.find().sort({
            _id: -1
        }).limit(1) : await User.find();

        // display all the information of user except for password
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get users stats
router.get('/stats', verifyTokenAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([{
                $match: {
                    // shows all the users created earlier than last year
                    createdAt: {
                        $gte: lastYear
                    }
                }
            },
            {
                $project: {
                    // take the month inside the createdAt field and assign it to month
                    month: {
                        $month: '$createdAt'
                    }
                }
            },
            { //arrange group based on date created
                $group: {
                    // id will be the numerical month
                    _id: '$month',
                    // total user number
                    total: {
                        $sum: 1
                    }
                }
            }
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;