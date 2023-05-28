const mongoose = require('mongoose');
const WorkOut = require('../schemma/workoutschemma');
const createWorkout = async (req, res) =>{
    console.log('12')
    const {title,load,reps} = req.body;
    const emptyField = ['moon'];
    if(!title){
        emptyField.push('title');
    }
    if(!load){
        emptyField.push('load');
    }
    if(!reps){
        emptyField.push('reps');
    }

   
    const {_id} = req.user;
    // console.log(typeof title, typeof load, typeof reps)
    console.log(emptyField);
    try{
        if(emptyField.length > 1){
            res.status(400).json({message : 'Please fill all the fields',emptyField : [...emptyField]});
        }else{
            const workout = new WorkOut({
                title : title,
                load : load,
                reps : reps,
                user_id : _id
            })
            const result = await workout.save();
            // const workout = await Workout?.create({title,load,reps,user_id : _id});
            console.log(workout);
            console.log(result);
            console.log('456'); res.status(200).json(workout);
        }
        
    }catch(e){
        res.status(400).json({message:e.message, emptyField:e.emptyField});
    }
}
const getAllWorkout = async (req,res)=>{
    const {_id} = req.user;
    console.log(_id);
    try{
        const result = await WorkOut?.find({user_id : _id})
        res.status(200).json(result);
    }catch(e){
        res.status(400).json({message : e.message});
    }
}
const getWorkout = async(req,res)=>{
    try{
        const {_id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).json({message : 'Invalid ID'})
        }
        const result = await WorkOut?.find({user_id : _id});
        if(result){
           res.status(200).json(result);
        }else{
            res.status(400).json({message : 'No data found'})
        }
    }catch(e){
        res.status(400).json({message : e.messgae});
    }
}
const deleteWorkout = async (req,res)=>{
    try{
    const {_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
       return res.status(404).json({message : "No such ID exist!!"});
    }
    const result = await WorkOut?.findByIdAndDelete(_id);
    if(result){
      return  res.status(200).json(result); 
    }else{
       return res.status(400).json({message : 'No workout to delete'});
    }
}catch(e){
    res.status(400).json({message : e.message});
}
}
const updateWorkout = async (req,res)=>{
     try{
        const {_id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(_id)){
         return   res.status(404).json({message : 'Invalid Id'});
        }
        const {title,load,reps} = req.body;
        const updatingObject = {};
        if(title){
            updatingObject.title = title;
        }
        if(load){
            updatingObject.load = load;
        }
        if(reps){
            updatingObject.reps = reps;
        }
        const result = WorkOut?.findByIdAndUpdate({_id,updatingObject,new : true})
        if(result){
            res.status(200).json(result);
        }else{
            res.status(400).json({message : 'No workout to update'});
        }
     }catch(e){
        res.status(400).json({message : e.message});
     }
}
module.exports = {getWorkout,getAllWorkout,createWorkout,deleteWorkout,updateWorkout}