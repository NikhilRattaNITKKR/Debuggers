const mongoose = require('mongoose');

const postSchema=new mongoose.Schema({
  uid:{
    type:String,
    required:true,
    trim:true,
  },
  votes:{
    type:Number,
    default:0,
  },
  desc:{          //the description of event
    type:String,
    required:true,
    minlength:30,
  },
  picture:{
    type:Buffer,
    contentType:'image/png',
  },
  genre:{
    type: String,
    trim:true,
    required:true,
  },
  commentId:{
    type:String,
    required:true,
    trim:true,
  }
})

mongoose.model('Post', postSchema)
