const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");


// register new user
const register = async (req, res) => {
    try {

      // get data from request body and assign  to variable
      const { fullName, email, password } = req.body;
  
      // handle the user entries
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
  
      // ensure if the user is alerady exit خق ىخف
      const isUserExist = await User.findOne({ email: email });
  
      if (isUserExist) {
        return res.json({ error: true, message: "هذا المستخدم موجود بالفعل, حرب ايميل آخر" });
      }
  
      // user not exist 
      // password hashing
      const hashedPassword = await bcrypt.hash(password,10);
  
      const user = new User({
        fullName,
        email,
        password : hashedPassword,
      });

      // add new user
      await user.save();
  
      // generte token
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
      return res
            .status(400)
            .json({ error: true, message: "Email is required" });
    }
  
    if (!password) {
      return res
        .status(400)
        .json({ error: true, message: "Password is required" });
    }
  
    // get user who matched with the email
    const user = await User.findOne({ email: email });
  
    if (!user) {
      return res.status(400).json({ message: "المستخدم غير موجود" });
    }
    // user email matched so matche the password.bcrypt pass to compare
    const matchedPassword =  await bcrypt.compare(password,user.password);
  
    // if the passwordsnot matched!
    if (!matchedPassword) {
      return res.status(400).json({ error: true, message: "كلمة المرور غير صحيحه" });
    }
  
  
    // user founded
    const logginedUser = { user: user };

      // generte token
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
// get specific user to perform user info for her profile
const getUserInfo = async (req, res) => {
  
    const {user} = req.user;
  
    const isUser = await  User.findOne({_id: user._id});
  
    if(!isUser){
      return res.sendStatus(401);
    }
  
    // return user info
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
    getUserInfo,
}