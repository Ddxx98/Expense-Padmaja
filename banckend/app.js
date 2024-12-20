const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const sequelize = require('./util/database')
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/signup',signupRoutes)
app.use('/login',loginRoutes)

sequelize.sync()
    .then(result => {
        app.listen(3000, () => {
            //console.log(result)
            console.log("Server running in 3000")
        });
    })
    .catch(err => {
        console.log(err);
    });