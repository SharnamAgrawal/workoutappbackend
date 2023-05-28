require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
const connectMongoDb = (url)=>{
   return mongoose.connect(url,{
        useNewUrlParser : true, useUnifiedTopology : true
    });
};
module.exports = connectMongoDb;
