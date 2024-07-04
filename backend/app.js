require('dotenv').config();
const User = require('./Models/user.model.js');
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
app.post('/register', async (req,res) => {
    try{
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

    const isUserExist = await User.findOne({email:email});

    if(isUserExist){
        return res.json({error: true,message: 'User already exist'})
    }

    const user = new User({
        fullName,
        email,
        password
    });
    // insert new user
    await user.save();

    const accessToken = jwt.sign({user} , process.env.ACCESS_SECRET_KEY,{
        expiresIn:'30m',
    });
    return res.json({
        error: false,
        user,
        accessToken,
        message: 'Registration Successful'
    });

    }catch(error){
        return res.json({error: true,message: error.message})

    }

})
app.post('/login', async (req,res) => {
    const {email,password} = req.body;

    if (!email){
        return res.status(400).json( {error: true,message: 'Email is required'} )
    }

    if (!password){
        return res.status(400).json( {error: true,message: 'Password is required'} )
    }

    const user = await User.findOne({email:email});

    if(!user) {
        return res.status(400).json({message: 'User not found'})
    }

    if(user.email == email && user.password ==password){
        const loginedUser = {user:user};
        const accessToken = jwt.sign(loginedUser,process.env.ACCESS_SECRET_KEY,{
            expiresIn:'36000m',

        });

        return res.json({
            error:false,    
            message: 'Login Successful',
            email,
            accessToken,    
        })
    }else{
        return res.status(400).json({
            error: true,
            message: 'Invalid Credentials',
        })
    }
});
app.listen(8000);

module.exports = app;