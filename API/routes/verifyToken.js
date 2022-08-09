const jwt = require('jsonwebtoken');

// Middleware
// function to verify token
const verifyToken = (req, res, next) => {
    // getting the token from the header
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        // verify if the token is the same as the jwt secret
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.status(403).json('Token is invalid!');
            } else {
                // if everything works
                req.user = user;
                next();
            }
        })
    } else {
        return res.status(401).json('You are not authenticated!');
    }
}

const tokenAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('You dont have a permission to perform this task!')
        }
    })
}

const verifyTokenAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('You dont have a permission to perform this task!')
        }
    })
}
module.exports = {
    verifyToken,
    tokenAuthorization,
    verifyTokenAdmin
};