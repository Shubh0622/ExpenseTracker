const express = require('express');
const cors = require('cors');

const sequelize = require('./util/database');
const expenseRoute = require('./routes/expense');
const userRoute = require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

app.use(expenseRoute);
app.use('/user',userRoute);

sequelize
    .sync()
    .then(result =>{
        app.listen(3000);
    })
    .catch(err => console.log(err));