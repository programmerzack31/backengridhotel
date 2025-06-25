const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async(req,res)=>{
    const {name,email,password} = req.body;
    const existing = await User.findOne({email});
    if(existing)return res.status(400).json({msg:'User Already exist'});

    const hashedPass = await bcrypt.hash(password,10);
    const newUser = await User.create({name , email , password:hashedPass});
    res.json(newUser);
};

exports.login = async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user|| !(await bcrypt.compare(password , user.password))){
        return res.status(401).json({msg:'Invalid credentials'});
    }
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:'1d'});
    res.json({token:token , userId:user.id});

};


exports.getProfile = async (req, res) => {
  try {
  

    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error in getProfile:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
