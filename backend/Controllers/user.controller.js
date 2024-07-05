const bcrypt = require("bcryptjs")
const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");

// register new user
const register = async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
  
      if (!fullName) {
        return res.status(400).json({ error: true, message: "Name is required" });
      }
  
      if (!email) {
        return res
          .status(400)
          .json({ error: true, message: "Email is required" });
      }
  
      if (!password) {
        return res
          .status(400)
          .json({ error: true, message: "Password is required" });
      }
  
      const isUserExist = await User.findOne({ email: email });
  
      if (isUserExist) {
        return res.json({ error: true, message: "User already exist" });
      }
  
      // password hashing
      const hashedPassword = await bcrypt.hash(password,10);
  
      const user = new User({
        fullName,
        email,
        password : hashedPassword,
      });
      // insert new user
      await user.save();
  
      const accessToken = jwt.sign({ user }, process.env.ACCESS_SECRET_KEY, {
        expiresIn: "30m",
      });
      return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful",
      });
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  };

  //login
const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: true, message: "Email is required" });
    }
  
    if (!password) {
      return res
        .status(400)
        .json({ error: true, message: "Password is required" });
    }
  
    const user = await User.findOne({ email: email });
  
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const matchedPassword =  await bcrypt.compare(password,user.password);
  
    if (!matchedPassword) {
      return res.status(400).json({ error: true, message: "Invalid password" });
    }
  
  
    const logginedUser = { user: user };

    const accessToken = jwt.sign(logginedUser, process.env.ACCESS_SECRET_KEY, {
        expiresIn: "36000m",
      });
  
      return res.json({
        error: false,
        message: "Login Successful",
        email,
        accessToken,
      });
   
  };
  // get specific user 
const getUser = async (req, res) => {
  
    const {user} = req.user;
  
    const isUser = await  User.findOne({_id: user._id});
  
    if(!isUser){
      return res.sendStatus(401);
    }
  
    return res.json({
      user:{
        fullName:isUser.fullName,
        email:isUser.email,
        createdaT:isUser.createdAt,
        _id:isUser._id,
      },
      message: 'get user successful'
    })
  }

  module.exports = {
    register,
    login,
    getUser
}