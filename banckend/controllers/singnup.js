const User = require('../models/user');
const bcrypt = require('bcrypt');

function hashedPassword(password) {
    return bcrypt.hashSync(password, 10);
}

exports.createUser = (req, res, next) => {
    const { name, email, password } = req.body;
    const hashedPass = hashedPassword(password);
    User.create({
        name: name,
        email: email,
        password: hashedPass
    }).then(result => {
        console.log(result);
        res.status(201).json({ message: "User Created" });
    }).catch(err => {
        res.status(500).json(err.original.code);
    });
}