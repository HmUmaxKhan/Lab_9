const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");
const Note = require("../../models/Notes");
const userinfo = require("../../middleware/userinfo");

router.delete('/deletenote',
async(req,res)=>{
    let {noteId} = req.body;

    try {
        const note = await Note.findByIdAndDelete(noteId);

        if (!note) {
            return res.status(400).json({success:false,Msg:`Note is not deleted to the database`})
        }

        return res.status(200).json({success:true,Msg:`Note is deleted successfully`})

    }  catch (error) {
    
        console.log(error);
    
        return res.status(500).json({success:false,Msg:'Internal Error',Err:error});
    }
})

module.exports = router;