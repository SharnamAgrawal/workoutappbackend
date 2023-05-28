const jwt = require('jsonwebtoken');
const {User} = require('../schemma/userSchemma');
const authentication = async(req,res,next)=>{
    const {authorization} = req.headers;
    try{ if(!authorization){
        throw new Error("Authorization not present")
    }
    let token = "";
    if(authorization && authorization.split(' ').length >1){
   token = authorization.split(' ')[1];}
   
   const {_id} = jwt.verify(token,process.env.SECRET)
   const re = await User?.find({_id}).select('_id');
   if(re){
    req.user = {_id}
   }
   if(!re){
    throw new Error("Invalid User")
   }
   console.log(req.user._id);
   next()
    }catch(e){
      console.log(`authentication function ${e.message}`)
      res.status(401).json({message : e.message})
    }
}
module.exports = {authentication}