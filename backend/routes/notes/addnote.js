const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");
const Note = require("../../models/Notes");
const userinfo = require("../../middleware/userinfo");

router.post('/addnote',userinfo,
async(req,res)=>{
    let {title , description} = req.body;

    try {
        const userId = req.user.id;
        let user = await Users.findOne({_id:userId});

        if (!user) {
        return res
        .status(201)
        .json({ success: false, Msg: `user is not registered` });
        }

        let len = description.length;

        if (len===null || len===0) {
            return res.status(400).json({success:false,Msg:`Note should not be empty`})
        }

        let lenT = title.length;

        if (lenT===null || lenT===0) {
            return res.status(400).json({success:false,Msg:`Title should not be empty`})
        }
        const note = await Note.create({
            user:userId,
            title:title,
            description:description
        });

        if (!note) {
            return res.status(400).json({success:false,Msg:`Note is not added to the database`})
        }

        return res.status(200).json({success:true,Msg:`Note is added successfully`})

    }  catch (error) {
    
        console.log(error);
    
        return res.status(500).json({success:false,Msg:'Internal Error',Err:error});
    }
})

module.exports = router;