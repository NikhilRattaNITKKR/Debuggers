const signUp=async (req,res)=>{


if(!req.body.email||!req.body.college||!req.body.password||!req.body.confirm){
  throw new Error("All fields must be filled");
}

if(req.body.password!==req.body.confirm){
  throw new Error("Passwords do not match");
}

let credentials={
  email:req.body.email+req.body.college,
  password:req.body.password,
}

console.log(credentials);

//send an email with confirmation

res.render("form");
}

const logIn=async (req,res)=>{

if(!req.body.email||!req.body.college||!req.body.password){
  throw new Error("All fields must be filled");
}

let credentials={
  email:req.body.email+req.body.college,
  password:req.body.password,
}

console.log(credentials);

//send an email with confirmation

res.render("form");
}

module.exports={
  logIn,
  signUp
}
