const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function verifyPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, "deexith2024");
}

exports.loginUser = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ where:{ email: email}}).then(result => {
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        } else if(!verifyPassword(password, result.password)) {
            return res.status(401).json({ message: "User not authorized" });
        }
        return res.status(200).json({message:"User login sucessful",token: generateToken(result) });
    }).catch(err => {
        return res.status(500).json(err.original.code);
    });
}