const Expense = require('../model/expense');

exports.postAddExpense = async (req,res,next) => {
    try{
        const expenseAmount = req.body.expenseAmount;
        const description = req.body.description;
        const category = req.body.category;

        const data = await Expense.create({
            expenseAmount: expenseAmount,
            description: description,
            category: category
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
        const expenses = await Expense.findAll();
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
        await Expense.destroy({where: {id: eId}});
        res.sendStatus(200);
    }
    catch(err){
        res.status(500).json({
            error: err
        })
    }
};