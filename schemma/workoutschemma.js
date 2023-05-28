const mongoose = require('mongoose');
const workoutSchemma = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    load : {
        type : String,
        required : true
    },
    reps :{
        type : String,
        required : true,
    },
    user_id : {
        type : String,
        required : true
    }
},{timestamps : true})
const WorkOut = new mongoose.model('Workout',workoutSchemma);
module.exports = WorkOut;