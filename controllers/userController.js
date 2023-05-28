require('dotenv').config();
const bcrypt = require('bcrypt')
const validator = require('validator')
const {userSchema,User} = require('../schemma/userSchemma')
const jwt = require('jsonwebtoken');
const signup = async function (email,password){
  if(!email || !password){
      throw Error('All fields must be filled')
  }

  const exist = await User.findOne({email});
  if(exist){
      throw Error('Email already exist')
  }
  try{
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password,salt);
  const user = await User?.create({email,password : hash});
  return user;}catch(e){
    console.log(`inside userController signup ${e.message}`)
    throw Error(e.message)
  }
}
const login = async function(email,password){
  if(!email || !password){
      throw  Error('All fields must be filled')
  }
  const user = await User?.findOne({email});
  if(!user){
      throw Error('Incorrect ID/Password');
  }
  const match = bcrypt.compare(password,user.password);
  if(!match){
      throw Error('Incorrect ID/Password')
  }
  return user;
}

const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn : '3d'})
}
const loginUser = async (req,res)=>{
  const {email,password} = req.body;
  try{
    const user = await login(email,password);
    const token = createToken(user._id);
    res.status(200).json({email,token});
  }catch(e){
    res.status(400).json({message : e.message})
  }
}
const signupUser =  async(req,res)=>{
const {email,password} = req.body;
try{
    const user = await signup(email,password)
    const token = createToken(user._id);
    res.status(200).json({email,token})
}catch(e){
    res.status(400).json({message : e.message});
}
}
module.exports = {loginUser,signupUser};