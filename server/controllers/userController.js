const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10 ;

// @desc Register a user
// @route POST/api/users/register
// @access public

const registerUser = async (req,res)=>{
    const{name,email,phone,password}=req.body;
    try {
        if (!(name || email || phone || password)) {
          res.status(409).json({ message: "Please fill the all fields properly !" });
        }
       const userExist = await User.findOne({email:email});
       if(userExist){
        res.status(401).json({message:"User already exist !"});
       }

      const hashedPassword = await bcrypt.hash(password ,saltRounds);

      const newUser = new User({
        name,
        email,
        phone,
        password: hashedPassword,
      });
      await newUser.save();
        res.status(201).json({newUser});
        return console.log("User registered successfully ", newUser.password);
    } catch (error) {
        res.status(500).json({message:error.message});
    }

}

// @desc Login a user
// @route POST/api/users/login
// @access public

const loginUser = async (req,res)=>{
    const{email,password}= req.body;

    if(!(email,password)){
        res.status(409).json({message:"Please fill the all filled properly !"});
    }
    const comparePassword = bcrypt.compare(password);

    const loginUser = new User({
        
    })

}
module.exports = {registerUser,loginUser};


