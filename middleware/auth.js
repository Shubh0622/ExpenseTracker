const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req,res,next) => {
    try{
        const token = req.header('Authorization');
        const user = jwt.verify(token, "SecretKey");
        User.findByPk(user.userId).then(user => {
            req.user = user;
            next();
        })
    }
    catch(err){
        return res.status(401).json({success: false})
    }
}

module.exports = {
    authenticate
};