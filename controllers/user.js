const bcrypt = require('bcrypt');
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
        bcrypt.hash(password,10, async(err, hash) =>{
            console.log(err);
            await User.create({
                userName: userName,
                email: email,
                password: hash
            });
            res.status(201).json({message:"user created successfully"});
        })    
    }
    catch(err){
        res.status(500).json({
            error: err
        })
    }
};

exports.postLoginReq = async(req,res,next) =>{
    try{
        const email = req.body.email;
        const password =req.body.password;

        const user = await User.findOne({where: { email: email}});
        // console.log(user.dataValues.password);
        if(user === null){
            return res.status(404).json({error: "User not found"});
        }
        if(user !== null){
            bcrypt.compare(password, user.password, (err,result)=>{
                if(err){
                    throw new Error('Something went Wrong');
                }
                if(result){
                    res.status(200).json({message: "User login successful"});
                }
                else{
                    res.status(401).json({error: "User not authorized"})
                }
            })
        }
    }
    catch(err){
        res.status(500).json({
            error: err
        })
    }
}