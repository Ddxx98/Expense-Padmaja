const { where } = require('sequelize');
const User = require('../models/user');

exports.loginUser = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ where:{ email: email}}).then(result => {
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        } else if(result.password !== password) {
            return res.status(401).json({ message: "User not authorized" });
        }
        return res.status(200).json({message:"User login sucessful", result });
    }).catch(err => {
        return res.status(500).json(err.original.code);
    });
}