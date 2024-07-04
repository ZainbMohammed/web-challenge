const jwt = require('jsonwebtoken');

function authenticateToken(req,res,next){
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    
    const token =authHeader && authHeader.split(' ')[1];
    if (!token){
        return res.sendState(401);
    }
    jwt.verify(token,process.env.ACCESS_SECRET_KEY,(error,user) => {

        if(error){
            return res.sendState(401);
        }
        req.user = user;
        next()
    })
}
module.exports = authenticateToken;