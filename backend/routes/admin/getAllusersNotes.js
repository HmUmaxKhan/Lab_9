const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");
const Note = require("../../models/Notes");

router.get('/getallusers',
async(req,res)=>{
    
    try {
        const users = await Users.find({admin:false});
        if (!users) {
            return res.status(400).json({success:false,Msg:`User is not updated to the database`})
        }

        const notes = await Note.find();

        return res.status(200).json({success:true,Msg:`Following are Users`, users,notes})

    }  catch (error) {
        console.log(error);
        return res.status(500).json({success:false,Msg:'Internal Error',Err:error});  
    }
})

module.exports = router;