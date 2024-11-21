const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");
const Note = require("../../models/Notes");
const userinfo = require("../../middleware/userinfo");

router.get('/getSinglenote',userinfo,
async(req,res)=>{
    
    try {
        const userId = req.user.id;
        let user = await Users.findOne({_id:userId});

        if (!user) {
        return res
        .status(201)
        .json({ success: false, Msg: `user is not registered` });
        }

        const note = await Note.find({user:user});
        if (!note) {
            return res.status(400).json({success:false,Msg:`Note is not updated to the database`})
        }

        return res.status(200).json({success:true,Msg:`Note is get successfully`, note,user})

    }  catch (error) {
        console.log(error);
        return res.status(500).json({success:false,Msg:'Internal Error',Err:error});  
    }
})

module.exports = router;