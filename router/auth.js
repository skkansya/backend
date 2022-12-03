// const { response } = require('express');
// const express=require('express');

// const router =express.Router();
// // router.use(express.json())
// const User = require("../model/User")

// router.get("/", (req,res)=>{
//   res.send("Hi! from router")
// });

// router.post("/register", async (req, resp) => {
//     //registering a new user
//     const{ email, mobileNumber}=req.body;
// try{
//     const userExist= await User.findOne({mobileNumber: mobileNumber})
//  if(userExist){
//     return resp.status(422).json({error: "Mobile Number already exist"})
//     }

//     let user = new User(req.body);
//     let result = await user.save();
//     result = result.toObject();
//     delete result.password;
//     Jwt.sign({ name: result.name }, jwtKey, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }, (err, token) => {
//       if (err) {
//         resp.status(401).send({
//           result: "Something went wrong, Please try after some time.",
//         });
//       }
//       resp.send({ result, auth: token });
//     });}catch (err){ console.log (err)}
//   });


// module.exports= router;