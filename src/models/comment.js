const mongoose = require('mongoose');

const commentSchema=new mongoose.Schema({
  pid:{
    type:String,
    trim:true,
    required:true,
  },
  comments:[{                    //an array of objects having these properties
    uid:{
      type:String,
      trim:true,
      required:true,
    },
    comment:{
      type:String,
      trim:true,
      required:true,
      minlength:6,
    },
  }],
})
