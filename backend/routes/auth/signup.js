const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");
const bcrypt = require("bcryptjs");

router.post('/signup',async(req,res)=>{
    const {username,password,name,admin} = req.body;

    console.log(username);
    try {
        
    let user = await Users.findOne({username});

    if(user){
        return res.status(400).json({success:false,Msg:'User already exists'});
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password,salt);

    const user1 = await Users.create({
        name,username,password:secPass,admin:admin
    })

    return res.status(200).json({success:true,Msg:`${name} is registered successfuly`});

    } catch (error) {
    
    console.log(error);

    return res.status(500).json({success:false,Msg:'Internal Error',Err:error});
    }
})

module.exports = router;