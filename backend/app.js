require('dotenv').config();

const config = require('./config.json');
const mongoose = require('mongoose');

mongoose.connect(config.connectionString);

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(
    cors({
        origin: '*',
    })
);

const jwt = require('jsonwebtoken');
const authenticateToken = require('./utilities');

app.get('/',(req,res) => {
    res.json({data:'hello'});
});

// register new user
app.post('register', async (req,res) => {
    const {fullName, email,password} = req.body;

    if (!fullName){
        return res.status(400).json( {error: true,message: 'Name is required'} )
    }

    if (!email){
        return res.status(400).json( {error: true,message: 'Email is required'} )
    }

    if (!password){
        return res.status(400).json( {error: true,message: 'Password is required'} )
    }
})

app.listen(8000);

module.exports = app;