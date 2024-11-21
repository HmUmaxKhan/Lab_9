const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwt_secret = `Walee`;

router.post("/signinadmin", async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await Users.findOne({ username });

    if (!user) {
      return res
        .status(201)
        .json({ success: false, Msg: `user is not registered` });
    }

    const secPass = user.password;
    const compPass = await bcrypt.compare(password, secPass);

    if (!compPass) {
      return res.status(401).json({ success: false, Msg: "Invalid Paasword" });
    }

    if(!user.admin){
        res.status(201).json({success:false,Msg:`You are not admin`})
    }

    const data = {
      user: {
        id: user._id,
      },
    };

    const token = jwt.sign(data, jwt_secret);

    res.status(200).json({ success: true, Msg: `${user.name} is signning in`, token:token ,});
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ success: false, Msg: "Internal Error", Err: error });
  }
});


module.exports = router;
