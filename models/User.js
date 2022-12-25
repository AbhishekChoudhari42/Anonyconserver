const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    require:true,
    min:2,
    max:120,
    unique:true,
  },
  email:{
    type:String,
    require:true,
    min:2,
    max:180,
    unique:true,
  },
  password:{
    type:String,
    min:8,
    max:80,
    unique:true,
  },
  googleId :{ 
    type:String,
    require:true
 },
  message:{
    type : Array,
    default:[]
  }
},{ timestamps: true })


module.exports = mongoose.model("User", UserSchema);