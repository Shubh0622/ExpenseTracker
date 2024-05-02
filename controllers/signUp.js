const User = require('../models/user');

exports.postAddUser = async (req,res,next) => {
    try{
        const userName = req.body.userName;
        const email = req.body.email;
        const password = req.body.password;
        const data = await User.create({
            userName: userName,
            email: email,
            password: password
        });
        res.status(201).json({userDetail: data})
    }
    catch(err){
        res.status(500).json({
            error: err
        })
    }
}