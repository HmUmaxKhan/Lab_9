const jwt = require("jsonwebtoken");

const jwt_secret = `Walee`;

const userinfo = (req,res,next) =>{
    try {
        let token = req.header('auth-token');
        if (!token){
            return res.status(201).json({success:false, Msg:`Auth token is not present`});
        }
        let data = jwt.verify(token,jwt_secret);
        req.user = data.user;
        next();

    } catch (error) {
        res.status(500).json({success:false,Msg:`Internal Error in middleware`})
    }
}

module.exports = userinfo;