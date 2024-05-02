const User = require('../models/user');

function isValidString(string){
    if(string == undefined || string.length ===0){
        return true
    }
    else{
        return false
    }
}

exports.postAddUser = async (req,res,next) => {
    try{
        const userName = req.body.userName;
        const email = req.body.email;
        const password = req.body.password;
        if(isValidString(userName) || isValidString(email) || isValidString(password)){
            return res.status(400).json({
                error: "Bad Parameters, Missing Something"
            })
        }
        await User.create({
            userName: userName,
            email: email,
            password: password
        });
        res.status(201).json({message:"user created successfully"})
        
    }
    catch(err){
        res.status(500).json({
            error: err
        })
    }
}