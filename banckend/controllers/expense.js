const Expense = require('../models/expense');

exports.createExpense = (req, res) => {
    const { description, category, amount } = req.body;
    Expense.create({ description, category, amount, userId:req.user.id }).then(result => {
        return res.status(201).json({ message: "Expense created", result });
    }).catch(err => {
        return res.status(500).json(err);
    });
}

exports.getExpenses = (req, res) => {
    Expense.findAll({where:{userId:req.user.id}}).then(result => {
        return res.status(200).json(result);
    }).catch(err => {
        return res.status(500).json(err);
    }); 
}

exports.deleteExpense = (req, res) => {
    const id = req.params.id;
    Expense.destroy({ where: { id } }).then(result => {
        return res.status(200).json({ message: "Expense deleted" });
    }).catch(err => {
        return res.status(500).json(err);
    });
}