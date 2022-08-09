const router = require('express').Router();
const User = require('../models/User');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

//Registering the user to the database
router.post('/register', async (req, res) => {
    const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_PASS).toString(),
    });

    // saving user to the database
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Logging in the user
router.post('/login', async (req, res) => {
    try {
        // finding the user by the username
        const user = await User.findOne({
            username: req.body.username
        });
        // if username dont exist send error
        !user && res.status(401).json('Invalid username or password!')
        // decrypting the password
        const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.SECRET_PASS);
        const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
        // if wrong password send error
        originalPassword !== req.body.password && res.status(401).json('Invalid username or password!');
        // show everything except for password
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SECRET, {
            expiresIn: '3d'
        })
        const {
            password,
            ...others
        } = user._doc;
        // if everything works return user
        res.status(200).json({
            ...others,
            accessToken
        });
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;