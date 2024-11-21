const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");
const Note = require("../../models/Notes");
const userinfo = require("../../middleware/userinfo");

router.put('/updatenote',
async(req,res)=>{
    let {title,description,noteId} = req.body;

    try {

        let len = description.length;

        if (len===null || len===0) {
            return res.status(400).json({success:false,Msg:`Note should not be empty`})
        }

        let lenT = title.length;

        if (lenT===null || lenT===0) {
            return res.status(400).json({success:false,Msg:`Title should not be empty`})
        }

        const note = await Note.findByIdAndUpdate(noteId,{$set:{title:title,description:description}});

        if (!note) {
            return res.status(400).json({success:false,Msg:`Note is not updated to the database`})
        }

        return res.status(200).json({success:true,Msg:`Note is updated successfully`})

    } catch (error) {
        
    }
})

module.exports = router;