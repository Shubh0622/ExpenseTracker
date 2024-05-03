const Expense = require('../models/expense');

exports.postAddExpense = async (req,res,next) => {
    try{
        const expenseAmount = req.body.expenseAmount;
        const description = req.body.description;
        const category = req.body.category;

        const data = await Expense.create({
            expenseAmount: expenseAmount,
            description: description,
            category: category,
            userId: req.user.id
        });
        res.status(201).json({newExpenseDetail: data})
    }
    catch(err){
        res.status(500).json({
            error: err
        })
    }
};

exports.getExpenses = async (req,res,next) =>{
    try{
        const expenses = await Expense.findAll({where: {userId: req.user.id}});
        res.status(200).json({allExpenses: expenses});
    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }
};

exports.deleteExpense = async (req,res,next) => {
    try{
        if(req.params.id == 'undefined'){
            return res.status(400).json({
                error: 'ID is missing'
            })
        }
        const eId = req.params.id;
        await Expense.destroy({where: {id: eId, userId: req.user.id}}).then(rows => {
            if(rows ===0){
                return res.status(404).json({message: "Expense doesent belongs to user."});
            }
            return res.status(200).json({message: "Deleted Successfully."});
        });
    }
    catch(err){
        res.status(500).json({
            error: err
        })
    }
};