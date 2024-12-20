const User = require('../models/user');

exports.createUser = (req, res, next) => {
    const { name, email, password } = req.body;
    User.create({
        name: name,
        email: email,
        password: password
    }).then(result => {
        console.log(result);
        res.status(201).json({ message: "User Created" });
    }).catch(err => {
        res.status(501).json(err.original.code);
    });
}