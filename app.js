require('dotenv').config();
const express = require('express');
const app = express();
const connectMongoDb = require('./database/d1');
const workoutRoute = require('./routes/router');
const userRoute = require('./routes/user');
const cors = require('cors');
const port = process.env.PORT || 3000;
const authentication = require('./middleware/authentication');
const whitelist = ['http://127.0.0.1:5173','https://workoutsapp.netlify.app','https://workoutsapp.netlify.app/login','https://workoutsapp.netlify.app/signup'];
const corsOptions = {
    origin : function(origin, callback){
        if(!origin || whitelist.indexOf(origin) !==-1){
            callback(null,true);
        }else{
            callback(new Error('NOt allowed by cors'))
        }
    },
    credentials : true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/workout',workoutRoute);
app.use('/api/user',userRoute);
// app.use(authentication);
const start = async () =>{
    try{
 await connectMongoDb(process.env.MONGODB_URI)
 app.listen(port, ()=>{console.log('Listening to port 3000!!!')})
    }catch(e){
        console.log(e.message);
    }
}; start();


