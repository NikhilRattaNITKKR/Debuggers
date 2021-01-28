const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true,
  },
  branch:{
    type:String,
    trim:true
  },
  rollNo:{
    type:Number,
    minlength:6,
    required:true,
    unique:true,
  },
  email:{                     //makesure its a nitkkr email
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
  },
  password:{
    type:String,
    required:true,
    trim:true,
    minlength:6,
  },
  avatar:{
    type:Buffer,
    contentType:'image/png',
  },
  about:{
    type:String,
    minlength:30,
    trim:true,
  },
  category:{
    type:String,
    enum:["Student","Non-Student"],
    default:"Student",
  },
  areasOfInterest:[{
      type:String,              //means this is an array of strings,
  }],
  profileURL:{
    type:String,
    trim:true,
    required:true,
  },
  tval:{
    type:Boolean,
  },
})

mongoose.model('User', userSchema )
