const mongoose = require("mongoose");
const {Schema} = require("mongoose")

const userSchema = new Schema({
    username: { type: String, required: true },
    password: {type:String, required:true},
    name: {type:String, required:true},
    admin:{type:Boolean}
});

const Users = mongoose.model('user',userSchema);

module.exports = Users;